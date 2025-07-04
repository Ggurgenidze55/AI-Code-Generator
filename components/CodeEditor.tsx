"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Share, Github, Code, Eye, Copy, Check, ExternalLink, Save } from "lucide-react"
import { useProjectStore } from "@/lib/store"

interface Project {
  files: { path: string; content: string }[]
  preview: string
}

interface CodeEditorProps {
  project: Project
  onBack: () => void
}

export function CodeEditor({ project, onBack }: CodeEditorProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const {
    selectedFile,
    setSelectedFile,
    activeTab,
    setActiveTab,
    isDeploying,
    setIsDeploying,
    deploymentUrl,
    setDeploymentUrl,
    preferences,
  } = useProjectStore()

  useEffect(() => {
    // Set initial selected file
    if (!selectedFile && project.files.length > 0) {
      setSelectedFile(project.files[0].path)
    }
  }, [project.files, selectedFile, setSelectedFile])

  useEffect(() => {
    // Create preview URL from HTML content
    const blob = new Blob([project.preview], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    setPreviewUrl(url)

    return () => {
      if (url) URL.revokeObjectURL(url)
    }
  }, [project.preview])

  const deployProject = async () => {
    setIsDeploying(true)
    try {
      const response = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project }),
      })

      const data = await response.json()
      if (data.success) {
        setDeploymentUrl(data.url)
        alert(`Project deployed successfully! URL: ${data.url}`)
      } else {
        throw new Error(data.error || "Deployment failed")
      }
    } catch (error: any) {
      console.error("Deployment failed:", error)
      alert(`Deployment failed: ${error.message}`)
    } finally {
      setIsDeploying(false)
    }
  }

  const downloadProject = () => {
    const projectData = {
      name: "Generated Project",
      files: project.files,
      preview: project.preview,
      generatedAt: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(projectData, null, 2)
    const blob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "v0-project.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyCode = async () => {
    const file = project.files.find((f) => f.path === selectedFile)
    if (file) {
      try {
        await navigator.clipboard.writeText(file.content)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        console.error("Failed to copy:", error)
        alert("Failed to copy code to clipboard")
      }
    }
  }

  const shareProject = async () => {
    try {
      const shareData = {
        title: "Check out this generated project!",
        text: "I created this with v0 AI code generator",
        url: window.location.href,
      }

      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(window.location.href)
        alert("Project URL copied to clipboard!")
      }
    } catch (error) {
      console.error("Sharing failed:", error)
    }
  }

  const openInNewTab = () => {
    if (previewUrl) {
      window.open(previewUrl, "_blank")
    }
  }

  const getFileIcon = (path: string) => {
    if (path.endsWith(".tsx") || path.endsWith(".ts")) return "🔷"
    if (path.endsWith(".css")) return "🎨"
    if (path.endsWith(".json")) return "📄"
    if (path.endsWith(".md")) return "📝"
    return "📄"
  }

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">v0</span>
              </div>
              <span className="font-semibold">Generated Project</span>
              <Badge variant="secondary">{project.files.length} files</Badge>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {preferences.autoSave && (
              <Button variant="ghost" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Auto-saved
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={copyCode}>
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button variant="outline" size="sm" onClick={downloadProject}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={shareProject}>
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button size="sm" onClick={deployProject} disabled={isDeploying} className="bg-black hover:bg-gray-800">
              <Github className="h-4 w-4 mr-2" />
              {isDeploying ? "Deploying..." : "Deploy"}
            </Button>
          </div>
        </div>
      </header>

      {/* Deployment Success Banner */}
      {deploymentUrl && (
        <div className="bg-green-50 border-b border-green-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-800 text-sm font-medium">Project deployed successfully!</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => window.open(deploymentUrl, "_blank")}>
              <ExternalLink className="h-4 w-4 mr-2" />
              View Live
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Panel - Tabs */}
        <div className="w-1/2 border-r border-gray-200 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
              <TabsTrigger value="preview" className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center space-x-2">
                <Code className="h-4 w-4" />
                <span>Code</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="flex-1 m-0">
              <div className="h-full relative">
                {previewUrl && (
                  <>
                    <iframe
                      src={previewUrl}
                      className="w-full h-full border-0"
                      title="Preview"
                      sandbox="allow-scripts allow-same-origin"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={openInNewTab}
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm shadow-lg"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open
                    </Button>
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="code" className="flex-1 m-0 flex">
              {/* File Explorer */}
              <div className="w-1/3 border-r border-gray-200 bg-gray-50">
                <div className="p-3 border-b border-gray-200 bg-white">
                  <h3 className="text-sm font-medium text-gray-900">Files</h3>
                </div>
                <div className="p-2">
                  {project.files.map((file, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedFile(file.path)}
                      className={`w-full text-left p-2 rounded text-sm hover:bg-gray-200 transition-colors ${
                        selectedFile === file.path ? "bg-blue-100 text-blue-700" : "text-gray-700"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{getFileIcon(file.path)}</span>
                        <span className="truncate">{file.path}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Display */}
              <div className="flex-1 bg-gray-900">
                {selectedFile && (
                  <div className="h-full flex flex-col">
                    <div className="p-3 border-b border-gray-700 bg-gray-800 flex items-center justify-between">
                      <span className="text-gray-300 text-sm">{selectedFile}</span>
                      <Button variant="ghost" size="sm" onClick={copyCode} className="text-gray-400 hover:text-white">
                        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    </div>
                    <div className="flex-1 overflow-auto">
                      <pre
                        className={`text-green-400 text-sm font-mono p-4 whitespace-pre-wrap ${
                          preferences.showLineNumbers ? "pl-12" : ""
                        }`}
                      >
                        {project.files.find((f) => f.path === selectedFile)?.content}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel - Always Preview */}
        <div className="w-1/2 bg-white">
          <div className="h-full relative">
            {previewUrl && (
              <>
                <iframe
                  src={previewUrl}
                  className="w-full h-full border-0"
                  title="Live Preview"
                  sandbox="allow-scripts allow-same-origin"
                />
                <div className="absolute top-4 right-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={openInNewTab}
                    className="bg-white/90 backdrop-blur-sm shadow-lg"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Trash2, Download, Eye } from "lucide-react"
import { useProjectStore } from "@/lib/store"

interface ProjectHistoryProps {
  onBack: () => void
  onLoadProject: (project: any) => void
}

export function ProjectHistory({ onBack, onLoadProject }: ProjectHistoryProps) {
  const { projectHistory, clearHistory } = useProjectStore()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getProjectTitle = (project: any) => {
    // Try to extract title from the first file
    const mainFile = project.files.find((f: any) => f.path.includes("page.tsx")) || project.files[0]
    if (mainFile) {
      const titleMatch = mainFile.content.match(/<h1[^>]*>([^<]+)<\/h1>/)
      if (titleMatch) {
        return titleMatch[1].substring(0, 50)
      }
    }
    return `Project ${project.files.length} files`
  }

  const downloadProject = (project: any, index: number) => {
    const projectData = {
      name: `Project ${index + 1}`,
      files: project.files,
      preview: project.preview,
      generatedAt: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(projectData, null, 2)
    const blob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `v0-project-${index + 1}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-white">
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
              <span className="font-semibold">Project History</span>
              <Badge variant="secondary">{projectHistory.length} projects</Badge>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {projectHistory.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearHistory}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {projectHistory.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No projects yet</h2>
            <p className="text-gray-600 mb-8">Start generating projects to see them here</p>
            <Button onClick={onBack}>Create Your First Project</Button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Projects</h1>
              <p className="text-gray-600">Browse and manage your generated projects</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectHistory.map((project, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="aspect-video bg-gray-100 relative">
                    {project.preview && (
                      <iframe
                        srcDoc={project.preview}
                        className="w-full h-full border-0 pointer-events-none"
                        title={`Project ${index + 1} Preview`}
                        sandbox="allow-scripts"
                      />
                    )}
                    <div
                      className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors cursor-pointer"
                      onClick={() => onLoadProject(project)}
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 truncate">{getProjectTitle(project)}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>{project.files.length} files</span>
                      <span>Just now</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" onClick={() => onLoadProject(project)} className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Open
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => downloadProject(project, index)}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

interface GeneratedProject {
  code: string
  preview: string
  success: boolean
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "გამარჯობა! 👋 მე ვარ AI ასისტენტი. შემიძლია:\n\n🔹 კოდის შექმნა (მაგ: 'შექმენი todo აპი')\n🔹 კითხვებზე პასუხგაცემა\n🔹 ტექნიკური დახმარება\n\nრით შემიძლია დაგეხმარო?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [currentProject, setCurrentProject] = useState<GeneratedProject | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateCode = async (prompt: string) => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setCurrentProject(data)
        return "✅ კოდი წარმატებით შეიქმნა! ახლა შეგიძლია ნახო მარჯვენა მხარეს პრივიუში."
      } else {
        throw new Error(data.error || "Generation failed")
      }
    } catch (error: any) {
      console.error("Code generation error:", error)
      return `❌ კოდის გენერაციის შეცდომა: ${error.message}`
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputMessage.trim()
    setInputMessage("")
    setLoading(true)

    try {
      // Check if this is a code generation request
      const lowerMessage = currentInput.toLowerCase()
      const isCodeRequest =
        lowerMessage.includes("შექმენი") ||
        lowerMessage.includes("გააკეთე") ||
        lowerMessage.includes("დაწერე") ||
        lowerMessage.includes("create") ||
        lowerMessage.includes("make") ||
        lowerMessage.includes("build") ||
        lowerMessage.includes("generate") ||
        lowerMessage.includes("app") ||
        lowerMessage.includes("აპი") ||
        lowerMessage.includes("აპლიკაცია") ||
        lowerMessage.includes("საიტი") ||
        lowerMessage.includes("page") ||
        lowerMessage.includes("გვერდი")

      let assistantResponse = ""

      if (isCodeRequest) {
        // Generate code first
        assistantResponse = await generateCode(currentInput)
      } else {
        // Get AI chat response
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: currentInput,
            messages: messages.slice(-5), // Send last 5 messages for context
          }),
        })

        const data = await response.json()

        if (response.ok && data.success) {
          assistantResponse = data.response
        } else {
          throw new Error(data.error || "Chat failed")
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: assistantResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err: any) {
      console.error("Error:", err)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `❌ შეცდომა: ${err.message || "რაღაც არასწორად მოხდა. სცადე ხელახლა."}`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        type: "assistant",
        content: "ჩათი გასუფთავდა! რით შემიძლია დაგეხმარო?",
        timestamp: new Date(),
      },
    ])
    setCurrentProject(null)
  }

  const quickPrompts = [
    "შექმენი landing page",
    "გააკეთე todo აპი",
    "დაწერე calculator",
    "შექმენი weather app",
    "რა არის React?",
    "როგორ ვისწავლო JavaScript?",
  ]

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        fontFamily: "system-ui, -apple-system, sans-serif",
        background: "#f5f5f5",
      }}
    >
      {/* Left Panel - Chat */}
      <div
        style={{
          width: currentProject ? "450px" : "100%",
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          borderRight: currentProject ? "1px solid #e1e5e9" : "none",
          transition: "width 0.3s ease",
        }}
      >
        {/* Header */}
        <header
          style={{
            background: "linear-gradient(135deg, #007bff, #6610f2)",
            color: "white",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                margin: "0 0 4px 0",
              }}
            >
              🤖 AI ჩათი
            </h1>
            <p
              style={{
                fontSize: "0.9rem",
                margin: 0,
                opacity: 0.9,
              }}
            >
              OpenAI GPT-4 ით მუშაობს
            </p>
          </div>
          <button
            onClick={clearChat}
            style={{
              background: "rgba(255,255,255,0.2)",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            🗑️ გასუფთავება
          </button>
        </header>

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <div
            style={{
              padding: "20px",
              background: "#f8f9fa",
              borderBottom: "1px solid #e1e5e9",
            }}
          >
            <h3
              style={{
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "12px",
                color: "#6c757d",
              }}
            >
              💡 სწრაფი მაგალითები:
            </h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(prompt)}
                  style={{
                    background: "#fff",
                    border: "1px solid #e1e5e9",
                    padding: "8px 12px",
                    borderRadius: "16px",
                    cursor: "pointer",
                    fontSize: "12px",
                    color: "#495057",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#007bff"
                    e.currentTarget.style.color = "white"
                    e.currentTarget.style.borderColor = "#007bff"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#fff"
                    e.currentTarget.style.color = "#495057"
                    e.currentTarget.style.borderColor = "#e1e5e9"
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                display: "flex",
                justifyContent: message.type === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "85%",
                  padding: "12px 16px",
                  borderRadius: "18px",
                  background: message.type === "user" ? "linear-gradient(135deg, #007bff, #0056b3)" : "#f8f9fa",
                  color: message.type === "user" ? "white" : "#333",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  fontSize: "14px",
                  lineHeight: "1.5",
                  whiteSpace: "pre-wrap",
                }}
              >
                <div>{message.content}</div>
                <div
                  style={{
                    fontSize: "11px",
                    opacity: 0.7,
                    marginTop: "4px",
                    textAlign: "right",
                  }}
                >
                  {message.timestamp.toLocaleTimeString("ka-GE", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "18px",
                  background: "#f8f9fa",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#007bff",
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                ></div>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#007bff",
                    animation: "pulse 1.5s ease-in-out infinite 0.2s",
                  }}
                ></div>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#007bff",
                    animation: "pulse 1.5s ease-in-out infinite 0.4s",
                  }}
                ></div>
                <span style={{ fontSize: "12px", color: "#6c757d", marginLeft: "4px" }}>AI ფიქრობს...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div
          style={{
            background: "#fff",
            borderTop: "1px solid #e1e5e9",
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "flex-end",
            }}
          >
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="დაწერე შენი კითხვა ან მოთხოვნა..."
              disabled={loading}
              style={{
                flex: 1,
                padding: "12px 16px",
                border: "2px solid #e1e5e9",
                borderRadius: "12px",
                fontSize: "14px",
                outline: "none",
                resize: "none",
                minHeight: "44px",
                maxHeight: "120px",
                fontFamily: "inherit",
              }}
              rows={1}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !inputMessage.trim()}
              style={{
                background: loading || !inputMessage.trim() ? "#6c757d" : "linear-gradient(135deg, #007bff, #0056b3)",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "12px",
                cursor: loading || !inputMessage.trim() ? "not-allowed" : "pointer",
                fontSize: "14px",
                fontWeight: "600",
                minWidth: "80px",
              }}
            >
              {loading ? "..." : "📤"}
            </button>
          </div>
          <p
            style={{
              fontSize: "12px",
              color: "#6c757d",
              margin: "8px 0 0 0",
              textAlign: "center",
            }}
          >
            Enter - გაგზავნა • Shift+Enter - ახალი ხაზი
          </p>
        </div>
      </div>

      {/* Right Panel - Full Screen Preview */}
      {currentProject && (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "#fff",
          }}
        >
          {/* Preview Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #28a745, #20c997)",
              color: "white",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#fff",
                  opacity: 0.8,
                }}
              ></div>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                📱 პრივიუ
              </span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "8px",
              }}
            >
              <button
                onClick={() => {
                  navigator.clipboard.writeText(currentProject.code)
                  alert("კოდი დაკოპირდა!")
                }}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                📋 კოდის კოპირება
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([currentProject.code], { type: "text/plain" })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement("a")
                  a.href = url
                  a.download = "generated-code.tsx"
                  document.body.appendChild(a)
                  a.click()
                  document.body.removeChild(a)
                  URL.revokeObjectURL(url)
                }}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                💾 ჩამოტვირთვა
              </button>
            </div>
          </div>

          {/* Full Screen Preview */}
          <div
            style={{
              flex: 1,
              position: "relative",
              background: "#f5f5f5",
            }}
          >
            <iframe
              srcDoc={currentProject.preview}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
              title="Full Screen Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 80%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          40% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"

interface SiteIdeaFormProps {
  onSiteGenerated: (siteContent: any) => void
  onError: (message: string) => void
}

const SiteIdeaForm: React.FC<SiteIdeaFormProps> = ({ onSiteGenerated, onError }) => {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/generate-site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })

      const contentType = res.headers.get("content-type") ?? ""

      // თუ პასუხი არ არის OK – ჯერ ტექსტზე/JSON-ზე წავიკითხოთ და მერე გავაგზავნოთ შეცდომა
      if (!res.ok) {
        const errBody = contentType.includes("application/json") ? await res.json() : await res.text()
        const message = typeof errBody === "string" ? errBody : errBody?.error || "Server returned an error"
        throw new Error(message)
      }

      // წარმატების შემთხვევაში მხოლოდ მაშინ წავიკითხავთ JSON-ს
      const data = contentType.includes("application/json")
        ? await res.json()
        : (() => {
            throw new Error("Server returned non-JSON response")
          })()

      onSiteGenerated(data)
      setPrompt("")
    } catch (error: any) {
      console.error("Error generating site:", error)
      onError(error.message || "Failed to generate site. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
          Enter your site idea:
        </label>
        <div className="mt-1">
          <textarea
            id="prompt"
            name="prompt"
            rows={3}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="e.g., A blog about sustainable living"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Site"}
        </button>
      </div>
    </form>
  )
}

export default SiteIdeaForm

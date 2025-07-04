import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, messages } = await request.json()

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required", success: false }, { status: 400 })
    }

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error: "OpenAI API Key არ არის კონფიგურირებული",
          success: false,
        },
        { status: 500 },
      )
    }

    const systemPrompt = `შენ ხარ მეგობრული AI ასისტენტი. პასუხები იყოს:
- მოკლე და ზუსტი (მაქსიმუმ 2-3 წინადადება)
- ქართულ ენაზე
- მეგობრული ტონით
- პრაქტიკული და სასარგებლო

თუ კითხვა კოდის შესახებ არ არის, მიეცი მოკლე, ინფორმაციული პასუხი.`

    console.log("Making chat request to OpenAI API...")

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.slice(-3).map((msg: any) => ({
            role: msg.type === "user" ? "user" : "assistant",
            content: msg.content,
          })),
          { role: "user", content: message },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    console.log("Chat API Response status:", response.status)

    if (!response.ok) {
      let errorMessage = "OpenAI API Error"
      try {
        const errorData = await response.text()
        console.error("OpenAI Chat API Error Response:", errorData)

        if (response.status === 401) {
          errorMessage = "OpenAI API Key არასწორია"
        } else if (response.status === 429) {
          errorMessage = "OpenAI API Rate Limit გადაჭარბებულია"
        } else if (response.status === 500) {
          errorMessage = "OpenAI სერვერის შეცდომა"
        }
      } catch (e) {
        console.error("Error parsing chat error response:", e)
      }

      throw new Error(errorMessage)
    }

    let data
    try {
      const responseText = await response.text()
      console.log("Chat raw response:", responseText.substring(0, 200) + "...")

      if (!responseText.trim()) {
        throw new Error("Empty response from OpenAI")
      }

      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error("Chat JSON Parse Error:", parseError)
      throw new Error("OpenAI API-დან არასწორი პასუხი მოვიდა")
    }

    const aiResponse = data.choices?.[0]?.message?.content || "ვერ მივიღე პასუხი OpenAI-დან"

    console.log("Chat response received successfully")

    return NextResponse.json({
      response: aiResponse,
      success: true,
    })
  } catch (error: any) {
    console.error("Chat error:", error)
    return NextResponse.json(
      {
        error: error.message || "ჩათის შეცდომა. სცადე ხელახლა.",
        success: false,
      },
      { status: 500 },
    )
  }
}

import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, messages } = await request.json()

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required", success: false }, { status: 400 })
    }

    // Simple responses without OpenAI for now
    const responses = {
      "რა არის react":
        "React არის JavaScript ბიბლიოთეკა მომხმარებლის ინტერფეისის შესაქმნელად. ის საშუალებას გაძლევს შექმნა ინტერაქტიული ვებ აპლიკაციები კომპონენტების გამოყენებით.",
      "როგორ ვისწავლო javascript":
        "JavaScript-ის სწავლისთვის: 1) დაიწყე ძირითადი სინტაქსით, 2) ივარჯიშე DOM მანიპულაციაში, 3) ისწავლე ES6+ ფუნქციები, 4) შექმენი პატარა პროექტები.",
      "რა არის html":
        "HTML (HyperText Markup Language) არის ვებ გვერდების შექმნის ძირითადი ენა. ის განსაზღვრავს ვებ გვერდის სტრუქტურას და შინაარსს.",
      "რა არის css":
        "CSS (Cascading Style Sheets) არის სტილების ენა, რომელიც აღწერს HTML ელემენტების გარეგნობას და განლაგებას.",
      "როგორ ვისწავლო პროგრამირება":
        "პროგრამირების სწავლისთვის: 1) აირჩიე ენა (JavaScript, Python), 2) ისწავლე ძირითადი კონცეფციები, 3) ივარჯიშე ყოველდღე, 4) შექმენი პროექტები.",
    }

    const lowerMessage = message.toLowerCase()

    // Check for exact matches
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key.toLowerCase())) {
        return NextResponse.json({
          response: response,
          success: true,
        })
      }
    }

    // Default helpful response
    let defaultResponse =
      "მიხვდი! შემიძლია დაგეხმარო:\n\n🔹 კოდის შექმნაში (მაგ: 'შექმენი todo აპი')\n🔹 პროგრამირების კითხვებში\n🔹 ტექნიკურ საკითხებში\n\nრა გაინტერესებს?"

    // Check if it's a code generation request
    if (lowerMessage.includes("შექმენი") || lowerMessage.includes("გააკეთე") || lowerMessage.includes("დაწერე")) {
      defaultResponse =
        "კოდის შექმნისთვის ჩაწერე კონკრეტული მოთხოვნა, მაგალითად:\n• 'შექმენი todo აპი'\n• 'გააკეთე calculator'\n• 'დაწერე landing page'\n\nკოდი ავტომატურად შეიქმნება და პრივიუში გამოჩნდება!"
    }

    return NextResponse.json({
      response: defaultResponse,
      success: true,
    })
  } catch (error: any) {
    console.error("Chat error:", error)
    return NextResponse.json({
      response: "შეცდომა მოხდა. სცადე ხელახლა.",
      success: true,
    })
  }
}

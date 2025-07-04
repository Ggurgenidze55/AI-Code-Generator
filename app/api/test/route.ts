import { NextResponse } from "next/server"

export async function GET() {
  try {
    const apiKey = process.env.OPENAI_API_KEY

    return NextResponse.json({
      success: true,
      hasApiKey: !!apiKey,
      apiKeyStart: apiKey ? apiKey.substring(0, 10) + "..." : "Not found",
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
    })
  }
}

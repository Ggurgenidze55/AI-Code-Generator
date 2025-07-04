"use client"

import { type NextRequest, NextResponse } from "next/server"

// Helper functions for fallback demos
function generateTodoAppCode() {
  return `export default function MyComponent() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }])
      setInput('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
          📝 Todo App
        </h1>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add new todo..."
            style={{
              flex: 1,
              padding: '12px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '16px'
            }}
          />
          <button
            onClick={addTodo}
            style={{
              background: '#667eea',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Add
          </button>
        </div>
        <div>
          {todos.map(todo => (
            <div
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px',
                background: todo.completed ? '#f0f0f0' : 'white',
                border: '1px solid #ddd',
                borderRadius: '8px',
                marginBottom: '8px'
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#888' : '#333'
              }}>
                {todo.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}`
}

function generateCounterCode() {
  return `export default function MyComponent() {
  const [count, setCount] = useState(0)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: 'white'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '30px' }}>
        🔢 Counter
      </h1>
      <div style={{ fontSize: '5rem', fontWeight: 'bold', marginBottom: '40px' }}>
        {count}
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            background: 'white',
            color: '#f5576c',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '10px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          +
        </button>
        <button
          onClick={() => setCount(count - 1)}
          style={{
            background: 'white',
            color: '#f5576c',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '10px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          -
        </button>
        <button
          onClick={() => setCount(0)}
          style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '2px solid white',
            padding: '15px 30px',
            borderRadius: '10px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  )
}`
}

function generateLandingPageCode() {
  return `export default function MyComponent() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <nav style={{
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.1)'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>
          🚀 MyApp
        </div>
        <div style={{ display: 'flex', gap: '30px' }}>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Features</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Pricing</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
        </div>
      </nav>

      <section style={{
        textAlign: 'center',
        padding: '100px 20px',
        color: 'white'
      }}>
        <h1 style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          lineHeight: '1.2'
        }}>
          Transform Your Ideas Into Reality
        </h1>
        <p style={{
          fontSize: '1.5rem',
          marginBottom: '40px',
          opacity: 0.9,
          maxWidth: '600px',
          margin: '0 auto 40px'
        }}>
          The ultimate platform for innovators and creators
        </p>

        {!subscribed ? (
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                flex: 1,
                padding: '18px 24px',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px'
              }}
            />
            <button
              type="submit"
              style={{
                background: '#ff6b6b',
                color: 'white',
                border: 'none',
                padding: '18px 32px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              Get Started
            </button>
          </form>
        ) : (
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '24px',
            borderRadius: '12px',
            display: 'inline-block'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
            <h3>Welcome aboard!</h3>
            <p>Check your email for next steps</p>
          </div>
        )}
      </section>
    </div>
  )
}`
}

function generatePreviewHtml(code: string) {
  return `<!DOCTYPE html>
<html lang="ka">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Component</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        body { 
            margin: 0; 
            padding: 0; 
            font-family: system-ui, -apple-system, sans-serif; 
        }
        #root { 
            min-height: 100vh; 
            width: 100%;
        }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        const { useState, useEffect, useRef } = React;
        
        ${code}
        
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<MyComponent />);
    </script>
</body>
</html>`
}

function getLocalDemo(prompt: string) {
  const p = prompt.toLowerCase()

  if (p.includes("todo") || p.includes("task")) {
    return { code: generateTodoAppCode(), preview: generatePreviewHtml(generateTodoAppCode()) }
  }

  if (p.includes("counter") || p.includes("count")) {
    return { code: generateCounterCode(), preview: generatePreviewHtml(generateCounterCode()) }
  }

  // Default to landing page
  return { code: generateLandingPageCode(), preview: generatePreviewHtml(generateLandingPageCode()) }
}

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt is required", success: false }, { status: 400 })
    }

    // If no OpenAI API key, return local demo
    if (!process.env.OPENAI_API_KEY) {
      console.log("No OpenAI API key found, using local demo")
      const { code, preview } = getLocalDemo(prompt)
      return NextResponse.json({
        code,
        preview,
        success: true,
      })
    }

    // Try OpenAI API
    console.log("Making request to OpenAI API...")

    const systemPrompt = `შენ ხარ React კოდის გენერატორი. შექმენი სრული, მუშა React კომპონენტი მომხმარებლის მოთხოვნის მიხედვით.

მოთხოვნები:
1. გამოიყენე მხოლოდ React hooks (useState, useEffect, და ა.შ.)
2. ყველაფერი იყოს ერთ კომპონენტში
3. გამოიყენე inline styles
4. კოდი იყოს სრული და მუშა
5. არ გამოიყენო external libraries
6. კომპონენტი იყოს responsive
7. დაამატე ლამაზი დიზაინი და ანიმაციები
8. კომპონენტის სახელი იყოს MyComponent

მაგალითი:
export default function MyComponent() {
  const [state, setState] = useState('')
  
  return (
    <div style={{...}}>
      {/* კომპონენტის შიგთავსი */}
    </div>
  )
}`

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
          { role: "user", content: prompt },
        ],
        max_tokens: 2500,
        temperature: 0.7,
      }),
    })

    console.log("OpenAI API Response status:", response.status)

    if (!response.ok) {
      console.error("OpenAI API Error - Status:", response.status)

      // Try to get error details
      let errorText = ""
      try {
        errorText = await response.text()
        console.error("OpenAI API Error Response:", errorText)
      } catch (e) {
        console.error("Could not read error response:", e)
      }

      // Fall back to local demo on API error
      console.log("Falling back to local demo due to API error")
      const { code, preview } = getLocalDemo(prompt)
      return NextResponse.json({
        code,
        preview,
        success: true,
      })
    }

    // Parse response safely
    let data
    try {
      const responseText = await response.text()
      console.log("Raw response length:", responseText.length)

      if (!responseText.trim()) {
        throw new Error("Empty response from OpenAI")
      }

      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError)

      // Fall back to local demo on parse error
      console.log("Falling back to local demo due to parse error")
      const { code, preview } = getLocalDemo(prompt)
      return NextResponse.json({
        code,
        preview,
        success: true,
      })
    }

    const generatedCode = data.choices?.[0]?.message?.content || ""

    if (!generatedCode.trim()) {
      console.log("Empty generated code, falling back to local demo")
      const { code, preview } = getLocalDemo(prompt)
      return NextResponse.json({
        code,
        preview,
        success: true,
      })
    }

    console.log("Generated code length:", generatedCode.length)

    // Extract React component code
    const codeMatch = generatedCode.match(/```(?:tsx?|javascript|jsx?)?\n?([\s\S]*?)\n?```/)
    const cleanCode = codeMatch ? codeMatch[1] : generatedCode

    const previewHtml = generatePreviewHtml(cleanCode)

    console.log("Successfully generated code and preview")

    return NextResponse.json({
      code: cleanCode,
      preview: previewHtml,
      success: true,
    })
  } catch (error: any) {
    console.error("Generation error:", error)

    // Final fallback to local demo
    try {
      const { prompt } = await request.json()
      const { code, preview } = getLocalDemo(prompt || "landing page")
      return NextResponse.json({
        code,
        preview,
        success: true,
      })
    } catch (fallbackError) {
      console.error("Fallback error:", fallbackError)
      return NextResponse.json(
        {
          error: "კოდის გენერაციის შეცდომა. სცადე ხელახლა.",
          success: false,
        },
        { status: 500 },
      )
    }
  }
}

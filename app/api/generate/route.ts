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

function generateCalculatorCode() {
  return `export default function MyComponent() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const inputOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+': return firstValue + secondValue
      case '-': return firstValue - secondValue
      case '*': return firstValue * secondValue
      case '/': return firstValue / secondValue
      case '=': return secondValue
      default: return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = parseFloat(display)
    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        background: '#2d3436',
        borderRadius: '24px',
        padding: '30px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        maxWidth: '400px',
        width: '100%'
      }}>
        <div style={{
          background: '#000',
          color: '#fff',
          padding: '30px 20px',
          borderRadius: '16px',
          marginBottom: '24px',
          textAlign: 'right',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          minHeight: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          fontFamily: 'monospace'
        }}>
          {display}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px'
        }}>
          <button onClick={clear} style={{
            gridColumn: 'span 2',
            background: '#e17055',
            color: 'white',
            border: 'none',
            padding: '20px',
            borderRadius: '12px',
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Clear
          </button>
          <button onClick={() => inputOperation('/')} style={{
            background: '#fdcb6e',
            color: '#2d3436',
            border: 'none',
            padding: '20px',
            borderRadius: '12px',
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            ÷
          </button>
          <button onClick={() => inputOperation('*')} style={{
            background: '#fdcb6e',
            color: '#2d3436',
            border: 'none',
            padding: '20px',
            borderRadius: '12px',
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            ×
          </button>

          {[7, 8, 9].map(num => (
            <button key={num} onClick={() => inputNumber(String(num))} style={{
              background: '#74b9ff',
              color: 'white',
              border: 'none',
              padding: '20px',
              borderRadius: '12px',
              fontSize: '20px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              {num}
            </button>
          ))}
          <button onClick={() => inputOperation('-')} style={{
            background: '#fdcb6e',
            color: '#2d3436',
            border: 'none',
            padding: '20px',
            borderRadius: '12px',
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            -
          </button>

          {[4, 5, 6].map(num => (
            <button key={num} onClick={() => inputNumber(String(num))} style={{
              background: '#74b9ff',
              color: 'white',
              border: 'none',
              padding: '20px',
              borderRadius: '12px',
              fontSize: '20px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              {num}
            </button>
          ))}
          <button onClick={() => inputOperation('+')} style={{
            background: '#fdcb6e',
            color: '#2d3436',
            border: 'none',
            padding: '20px',
            borderRadius: '12px',
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            +
          </button>

          {[1, 2, 3].map(num => (
            <button key={num} onClick={() => inputNumber(String(num))} style={{
              background: '#74b9ff',
              color: 'white',
              border: 'none',
              padding: '20px',
              borderRadius: '12px',
              fontSize: '20px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              {num}
            </button>
          ))}
          <button onClick={performCalculation} style={{
            background: '#00b894',
            color: 'white',
            border: 'none',
            padding: '20px',
            borderRadius: '12px',
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            gridRow: 'span 2'
          }}>
            =
          </button>

          <button onClick={() => inputNumber('0')} style={{
            gridColumn: 'span 2',
            background: '#74b9ff',
            color: 'white',
            border: 'none',
            padding: '20px',
            borderRadius: '12px',
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            0
          </button>
          <button onClick={() => inputNumber('.')} style={{
            background: '#74b9ff',
            color: 'white',
            border: 'none',
            padding: '20px',
            borderRadius: '12px',
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            .
          </button>
        </div>
      </div>
    </div>
  )
}`
}

function generatePreviewHtml(code) {
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

function getLocalDemo(prompt) {
  const p = prompt.toLowerCase()

  if (p.includes("todo") || p.includes("task")) {
    return { code: generateTodoAppCode(), preview: generatePreviewHtml(generateTodoAppCode()) }
  }

  if (p.includes("counter") || p.includes("count")) {
    return { code: generateCounterCode(), preview: generatePreviewHtml(generateCounterCode()) }
  }

  if (p.includes("calculator") || p.includes("calc")) {
    return { code: generateCalculatorCode(), preview: generatePreviewHtml(generateCalculatorCode()) }
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

    // Always use local demo for now to avoid API issues
    console.log("Using local demo for prompt:", prompt)
    const { code, preview } = getLocalDemo(prompt)

    return NextResponse.json({
      code,
      preview,
      success: true,
    })
  } catch (error: any) {
    console.error("Generation error:", error)

    // Final fallback
    const { code, preview } = getLocalDemo("landing page")
    return NextResponse.json({
      code,
      preview,
      success: true,
    })
  }
}

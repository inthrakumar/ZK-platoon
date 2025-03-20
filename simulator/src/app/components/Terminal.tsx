"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

type CommandHistoryItem = {
  command: string
  output: string | JSX.Element
}

export default function Terminal() {
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<CommandHistoryItem[]>([
    {
      command: "help",
      output: "Available commands: help, clear, echo, date, whoami, ls, about , set-malicious , start",
    },
  ])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [inputHistory, setInputHistory] = useState<string[]>([])

  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    // Scroll to the bottom when command history changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [commandHistory])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add command to input history
    setInputHistory((prev) => [...prev, input])
    setHistoryIndex(-1)

    // Process the command
    const command = input.trim()
    const output = processCommand(command)

    // Add to command history
    setCommandHistory((prev) => [...prev, { command, output }])

    // Clear input
    setInput("")
  }

  const processCommand = (command: string): string | JSX.Element => {
    const [cmd, ...args] = command.split(" ")

    switch (cmd.toLowerCase()) {
      case "help":
        return "Available commands: help, clear, echo, date, whoami, ls, about"

      case "clear":
        setTimeout(() => {
          setCommandHistory([])
        }, 100)
        return "Clearing terminal..."

      case "echo":
        return args.join(" ") || ""

      case "date":
        return new Date().toString()

      case "whoami":
        return "browser-user"

      case "ls":
        return (
          <div className="grid grid-cols-3 gap-2">
            <span className="text-blue-400">documents/</span>
            <span className="text-blue-400">pictures/</span>
            <span className="text-blue-400">downloads/</span>
            <span className="text-yellow-400">readme.txt</span>
            <span className="text-yellow-400">notes.md</span>
            <span className="text-green-400">script.js</span>
          </div>
        )

      case "about":
        return "Browser CLI v1.0.0 - A terminal emulator for the web"

      default:
        return `Command not found: ${cmd}. Type 'help' for available commands.`
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle up arrow for history navigation
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (inputHistory.length > 0 && historyIndex < inputHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(inputHistory[inputHistory.length - 1 - newIndex])
      }
    }

    // Handle down arrow for history navigation
    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(inputHistory[inputHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }

    // Handle tab for auto-complete (simplified version)
    if (e.key === "Tab") {
      e.preventDefault()
      const commands = ["help", "clear", "echo", "date", "whoami", "ls", "about"]
      const matchingCommands = commands.filter((cmd) => cmd.startsWith(input))

      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0])
      }
    }
  }

  const clearTerminal = () => {
    setCommandHistory([])
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-xl">
      <div ref={terminalRef} className="bg-black p-4 h-96 overflow-y-auto font-mono text-sm text-gray-200">
        <div className="mb-4">
          <p className="text-green-400">ZKP PLATOON</p>
        </div>

        {commandHistory.map((item, index) => (
          <div key={index} className="mb-2">
            <div className="flex items-center text-green-400">
              <span className="ml-1 font-bold">~$</span>
              <span className="ml-2">{item.command}</span>
            </div>
            <div className="ml-6 mt-1 text-gray-300">{item.output}</div>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <div className="flex items-center text-green-400">
            <span className="ml-1 font-bold">~$</span>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 ml-2 bg-transparent outline-none text-white"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  )
}



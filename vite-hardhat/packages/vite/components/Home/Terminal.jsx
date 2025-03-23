
import { useState, useRef, useEffect, JSX } from "react";
import { zk_platoon } from "../../utils/zk_platoon";



export default function Terminal({
  start,
  setStart,
  setfaulty,
  setCount,
  count,
}) {
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([
    {
      command: "help",
      output:
        "Available commands: help, clear, echo, date, whoami, ls, about , setfaulty , start,stop",
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [inputHistory, setInputHistory] = useState([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Scroll to the bottom when command history changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add command to input history
    setInputHistory((prev) => [...prev, input]);
    setHistoryIndex(-1);

    // Process the command
    const command = input.trim();
    const output = processCommand(command);

    // Add to command history
    setCommandHistory((prev) => [...prev, { command, output }]);

    // Clear input
    setInput("");
  };

  const processCommand = async (command) => {
    const [cmd, ...args] = command.split(" ");

    switch (cmd.toLowerCase()) {
      case "help":
        return "Available commands: help, clear, echo, date, whoami, ls, about, setfaulty, start, prove";

      case "clear":
        setTimeout(() => {
          setCommandHistory([]);
        }, 100);
        return "Clearing terminal...";

      case "echo":
        return args.join(" ") || "";

      case "date":
        return new Date().toString();

      case "whoami":
        return "browser-user";
      case "start":
        setStart(true);
        return "Simulation has been started";
      case "stop":
        setStart(false);
        return "Simulation Stopped";
      case "setfaulty":
        if (count == 2) {
          return "Maximum number of malicious trucks has been set already";
        }
        if (!start) {
          return "Simulation need to be started";
        }
        setfaulty(true);
        
        return "Malicious Node has been set";
      case "about":
        return "Browser CLI v1.0.0 - A terminal emulator for the web";
      case "prove":
        const proof = await zk_platoon.generateProof();
        console.log("Proof:", proof.proof);
        console.log("Public Inputs:", proof.publicInputs);
        return `Proof: ${JSON.stringify(proof.proof)}\nPublic Inputs: ${JSON.stringify(proof.publicInputs)}`;        
      default:
        return `Command not found: ${cmd}. Type 'help' for available commands.`;
    }
  };

  const handleKeyDown = (e) => {
    // Handle up arrow for history navigation
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (inputHistory.length > 0 && historyIndex < inputHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(inputHistory[inputHistory.length - 1 - newIndex]);
      }
    }

    // Handle down arrow for history navigation
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(inputHistory[inputHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }

    // Handle tab for auto-complete (simplified version)
    if (e.key === "Tab") {
      e.preventDefault();
      const commands = [
        "help",
        "clear",
        "echo",
        "date",
        "whoami",
        "ls",
        "about",
      ];
      const matchingCommands = commands.filter((cmd) => cmd.startsWith(input));

      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0]);
      }
    }
  };

  const clearTerminal = () => {
    setCommandHistory([]);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-xl">
      <div
        ref={terminalRef}
        className="bg-black p-4 h-80 overflow-y-auto font-mono text-sm text-gray-200"
      >
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
  );
}

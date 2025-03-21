"use client";
import React, { useState } from "react";
import TruckChart from "./components/TruckChart";
import Terminal from "./components/Terminal";
import { TerminalContextProvider } from "react-terminal";
const App = () => {
  const [start, setStart] = useState(false);
  const [faulty, setfaulty] = useState(false);
  const [count, setCount] = useState(0);
  return (
    <TerminalContextProvider>
      <div className="flex w-full h-screen items-center justify-center gap-10 flex-col">
        <div className="h-1/2">
          <h1>Truck Animation on Chart</h1>
          <TruckChart start={start} count={count} setCount={setCount} faulty={faulty} setfaulty={setfaulty} />
        </div>
        <div className="h-1/2 w-full">
          <Terminal setStart={setStart} setfaulty={setfaulty} count={count} start={start} />
        </div>
      </div>
    </TerminalContextProvider>
  );
};

export default App;

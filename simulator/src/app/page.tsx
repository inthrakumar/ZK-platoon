"use client";
import React from "react";
import TruckChart from "./components/TruckChart";
import Terminal from "./components/Terminal";
import { TerminalContextProvider } from "react-terminal";
const App = () => {
  return (
    <TerminalContextProvider>
      <div className="flex w-full h-screen items-center justify-center gap-10 flex-col">
        <div className="h-1/2">
          <h1>Truck Animation on Chart</h1>
          <TruckChart />
        </div>
        <div className="h-1/2 w-full">
          <Terminal />
        </div>
      </div>
    </TerminalContextProvider>
  );
};

export default App;

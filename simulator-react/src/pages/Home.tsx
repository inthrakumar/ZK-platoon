"use client";
import React, { useState } from "react";
import TruckChart from "../components/Home/TruckSimulation";
import Terminal from "../components/Home/Terminal";
const Home = () => {
  const [start, setStart] = useState(false);
  const [faulty, setfaulty] = useState(false);
  const [count, setCount] = useState(0);
  return (
      <div className="flex w-full h-screen items-center justify-center gap-10 flex-col">
        <div className="h-1/2">
          <h1>Truck Animation on Chart</h1>
          <TruckChart start={start} count={count} setCount={setCount} faulty={faulty} setfaulty={setfaulty} />
        </div>
        <div className="h-1/2 w-full">
          <Terminal setStart={setStart} setfaulty={setfaulty} count={count} start={start} />
        </div>
      </div>
  );
};

export default Home;

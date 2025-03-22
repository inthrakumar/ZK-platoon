import React from "react";
import { Vortex } from "../components/ui/Vortex";

function Test() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      {/* Limit the size of Vortex */}
      <div className="relative w-2/3 h-1/3 border border-gray-200 rounded-xl">
        <Vortex containerClassName="absolute inset-0" className="rounded-xl" />

        <div className="flex flex-col justify-center items-center text-white z-10 absolute inset-0">
          <p className="font-bold">Welcome to</p>
          <p className="text-4xl font-bold ">ZK-Platoon</p>
          <p className="">enter</p>
          <p className="text-5xl font-bold ">start</p>
          <p className="font-bold">to visualize the zk-platoon simulation</p>
        </div>
      </div>
    </div>
  );
}

export default Test;

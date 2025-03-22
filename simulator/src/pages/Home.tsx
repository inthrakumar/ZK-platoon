"use client";

import TruckChart from "../components/Home/TruckSimulation";
import Terminal from "../components/Home/Terminal";
import ZkPlatoonComponent from "../components/verify/zkverifybutton";
import ConnectWallet from "../components/wallet/connectWallet";
import circuit from "../../assets/zk_platoon/circuit.json"
import { UltraHonkBackend } from "@aztec/bb.js";
import { Noir } from "@noir-lang/noir_js";
import initNoirC from "@noir-lang/noirc_abi";
import initACVM from "@noir-lang/acvm_js";
import acvm from "@noir-lang/acvm_js/web/acvm_js_bg.wasm?url";
import noirc from "@noir-lang/noirc_abi/web/noirc_abi_wasm_bg.wasm?url";
import { CompiledCircuit } from '@noir-lang/types';
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useReadContract } from 'wagmi'
const ZKPlatoon_address="0xf13D09eD3cbdD1C930d4de74808de1f33B6b3D4f"
import {abi} from "../config/abi"
import { useState, useEffect } from "react";
import { type UseReadContractReturnType } from 'wagmi'
const Home = () => {
  const [start, setStart] = useState(false);
  const [faulty, setfaulty] = useState(false);
  const [count, setCount] = useState(0);
  return (
      <div className="flex w-full h-screen items-center justify-center gap-10 flex-col p-12">
        <div className="h-1/2">
          <ConnectWallet />
          <h1>Truck Animation on Chart</h1>
          <TruckChart start={start} count={count} setCount={setCount} faulty={faulty} setfaulty={setfaulty} />
        </div>
        <div className="h-1/2 w-full">
          <Terminal  setCount={setCount} setStart={setStart} setfaulty={setfaulty} count={count} start={start} />
        </div>
        <div>
          <ZkPlatoonComponent />
        </div>
      </div>
  );
};

export default Home;

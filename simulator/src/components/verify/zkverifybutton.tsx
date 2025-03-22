import circuit from "../../../assets/zk_platoon/circuit.json"
import { UltraHonkBackend } from "@aztec/bb.js";
import { Noir } from "@noir-lang/noir_js";
import initNoirC from "@noir-lang/noirc_abi";
import initACVM from "@noir-lang/acvm_js";
import acvm from "@noir-lang/acvm_js/web/acvm_js_bg.wasm?url";
import noirc from "@noir-lang/noirc_abi/web/noirc_abi_wasm_bg.wasm?url";
import { CompiledCircuit } from '@noir-lang/types';
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useReadContract } from 'wagmi'
const ZKPlatoon_address="0x5FbDB2315678afecb367f032d93F642f64180aa3"
import {abi} from "../../config/abi.ts"
import { useState, useEffect } from "react";

export function uint8ArrayToHex(buffer: Uint8Array): string {
  const hex: string[] = [];

  buffer.forEach(function (i) {
    let h = i.toString(16);
    if (h.length % 2) {
      h = "0" + h;
    }
    hex.push(h);
  });

  return "0x" + hex.join("");
}


const ZkPlatoonComponent = () => {
  const [proof, setProof] = useState<Uint8Array>(new Uint8Array(0));
  const [isReady,setIsReady] = useState<boolean>(false);
  const [publicInputs, setPublicInputs] = useState<string[]>([]);
  const { data: hash, isPending, writeContract:_writeContract, error } = useWriteContract();
  const [isVerifying,setIsVerifying] = useState(false);
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
  useWaitForTransactionReceipt({
    hash,
  });
const [_logs, setLogs] = useState<string[]>([]);
const [_results, setResults] = useState("");
const showLog = (content: string): void => {
  setLogs((prevLogs) => [...prevLogs, content]);
};

  const generateProof = async () => {
    try {

      const vehicles = ["A", "B", "C", "D", "E", "F"];
      const Vehicle_Response = [
        ["0", "B"],
        ["A", "C"],
        ["B", "F"],
        ["C", "E"],
        ["D", "F"],
        ["C", "1"],
      ];
      const vehicle_name = "A";
      // Generate inputs for ZKP
      const inputsZKP = await generateInputs(vehicles, Vehicle_Response, vehicle_name);

      const inputs = {
        vehicles: inputsZKP.vehicles,
        Vehicle_Response: inputsZKP.vehicle_response,
        vehicle_name: inputsZKP.vehicle_name,
      };
    await Promise.all([initACVM(fetch(acvm)), initNoirC(fetch(noirc))]);
    const noir = new Noir(circuit as CompiledCircuit);
    const honk = new UltraHonkBackend(circuit.bytecode, { threads: 1 });
      const { witness } = await noir.execute(inputs);
      console.log("hitt")

      const { proof, publicInputs } = await honk.generateProof(witness, { keccak: true });
      console.log("Proof Hex:", proof);
      console.log("Formatted Public Inputs:",publicInputs);
      const cleanProof = proof.slice(4); // remove first 4 bytes (buffer size)
      console.log("proofHex", uint8ArrayToHex(cleanProof));
      setIsVerifying(true);
      setProof(proof);
      setPublicInputs(publicInputs);
      setIsReady(true);
    } catch (error) {
      console.error("Error generating proof or sending transaction:", error);
      showLog("Error submitting transaction 💔");
      setIsVerifying(false);

    }
  };
  const {data, refetch,isError,isSuccess}=useReadContract({
    address: ZKPlatoon_address ,
    abi: abi,
    functionName: "verify",
    args: [uint8ArrayToHex(proof), publicInputs],
    query:{
      enabled: !!isReady
    }
  });
  console.log(data);
  console.log(isError);
  console.log(isSuccess);
  useEffect(
    ()=>{
      if(isVerifying){
        refetch();
      }
    },[proof,publicInputs]
  )
  // Watch for pending, success, or error states from wagmi
  useEffect(() => {
    if (isPending) {
      showLog("Transaction is processing... ⏳");
    }

    if (error) {
      showLog("Oh no! Something went wrong. 😞");
      setResults("Transaction failed.");
    }
    if (isConfirming) {
      showLog("Transaction in progress... ⏳");
    }
    // If transaction is successful (status 1)
    if (isConfirmed) {
      showLog("You got it right! ✅");
      setResults("Transaction succeeded!");
    }
  }, [isPending, error, isConfirming, isConfirmed]);

  return (
    <div>
      <button onClick={generateProof}>
        {"Generate Proof"}
      </button>
    </div>
  );
};

async function generateInputs(vehicles: string[], Vehicle_Response: string[][], vehicle_name: string) {
  const validatedVehicleResponse = Vehicle_Response.map(res => 
    [String(res[0]), String(res[1])]
  );

  return {
    vehicles,
    vehicle_response: validatedVehicleResponse,
    vehicle_name,
  };
}

export default ZkPlatoonComponent;

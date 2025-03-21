import React from "react";
import { InputMap, type CompiledCircuit } from "@noir-lang/noir_js";
import { initProver } from "./lazy-modules";
import initNoirC from "@noir-lang/noirc_abi";
import initACVM from "@noir-lang/acvm_js";
import acvm from "@noir-lang/acvm_js/web/acvm_js_bg.wasm?url";
import noirc from "@noir-lang/noirc_abi/web/noirc_abi_wasm_bg.wasm?url";
await Promise.all([initACVM(fetch(acvm)), initNoirC(fetch(noirc))]);

export const zk_platoon = {
  generateProof: async () => {
    // Your async logic here
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

    const inputsZKP = await generateInputs(vehicles, Vehicle_Response, vehicle_name);

    const inputs={
        vehicles: inputsZKP.vehicles,
        vehicle_response: inputsZKP.vehicle_response,
        vehicle_name: inputsZKP.vehicle_name
    }

    const { Noir, UltraHonkBackend } = await initProver();
    const circuitArtifact = await import(
      "../../assets/zk_platoon/circuit.json"
    );
    const backend = new UltraHonkBackend(circuitArtifact.bytecode);
    const noir = new Noir(circuitArtifact as CompiledCircuit);
    // Generate witness and prove
    const startTime = performance.now();
    const { witness } = await noir.execute(inputs as InputMap);
    const proof = await backend.generateProof(witness);
    const provingTime = performance.now() - startTime;    
    console.log(proof);
    console.log(`Proof generated in ${provingTime}ms`);

  },
};
function generateInputs(vehicles: string[], Vehicle_Response: string[][], vehicle_name: string) {
    // Validate that vehicles array has the required length of 6
    if (vehicles.length !== 6) {
      throw new Error("Vehicles array must have exactly 6 elements.");
    }
  
    // Validate that Vehicle_Response is a 2D array with exactly 6 tuples of two strings
    if (Vehicle_Response.length !== 6 || !Vehicle_Response.every(res => res.length === 2)) {
      throw new Error("Vehicle_Response must be an array of 6 tuples with 2 elements each.");
    }
  
    // Validate that vehicle_name is a single character
    if (vehicle_name.length !== 1) {
      throw new Error("vehicle_name must be a string of length 1.");
    }
  
    // Return the ZKP inputs as required by the abi structure
    return {
      vehicles: vehicles.map(vehicle => ({ type: 'string', value: vehicle })), // Each vehicle is a string of length 1
      vehicle_response: Vehicle_Response.map(res => ({
        type: 'tuple',
        value: [
          { type: 'string', value: res[0] }, // First value of the tuple (length 1)
          { type: 'string', value: res[1] }  // Second value of the tuple (length 1)
        ]
      })),
      vehicle_name: { type: 'string', value: vehicle_name } // Single character
    };
  }
  
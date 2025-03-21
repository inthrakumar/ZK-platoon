import React from "react";
import { InputMap, type CompiledCircuit } from "@noir-lang/noir_js";
import { initProver } from "./lazy-modules";

async function loadCircuitArtifact() {
  return await import("../../assets/zk_platoon/circuit.json");
}

export const zk_platoon = {
  generateProof: async () => {
    // Load the circuit artifact inside the async function
    const circuitArtifact = await loadCircuitArtifact();

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
    console.log(inputsZKP);

    const inputs = {
      vehicles: inputsZKP.vehicles,
      Vehicle_Response: inputsZKP.vehicle_response,
      vehicle_name: inputsZKP.vehicle_name,
    };

    const { Noir, UltraHonkBackend } = await initProver();
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

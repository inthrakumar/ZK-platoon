import { useState } from 'react';
import React from 'react';
import { useOnChainVerification } from '../hooks/useOnChainVerification.js';
import { useProofGeneration } from '../hooks/useProofGeneration.js';
import { useOffChainVerification } from '../hooks/useOffChainVerification.js';
import JwtAuth from './jwtAuth.jsx';

export type Props = {
  vehicles : string[]
  Vehicle_Response : string[][]
  vehicle_name : string
}
function Component() {
  const [input, setInput] = useState<Props| undefined>();
  const { noir, proofData, backend } = useProofGeneration(input);
  useOffChainVerification(backend!, noir, proofData);
  const verifyButton = useOnChainVerification(proofData);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    setInput({ vehicles, Vehicle_Response, vehicle_name });


  };

  return (
    <>
      <form className="container" onSubmit={submit}>
        <h1>Example starter</h1>
        <h2>This circuit checks that x and y are different (yey!)</h2>
        <p>Try it!</p>
        <button type="submit">Calculate proof</button>
      </form>
      <JwtAuth />
      {verifyButton}
    </>
  );
}

export default Component;

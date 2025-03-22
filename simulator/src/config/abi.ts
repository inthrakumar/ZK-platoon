export const abi = [
    {
      "type": "constructor",
      "inputs": [
        { "name": "_verifier", "type": "address", "internalType": "address" }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "Getcount",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "count",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "verifier",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "contract HonkVerifier"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "verify",
      "inputs": [
        { "name": "proof", "type": "bytes", "internalType": "bytes" },
        {
          "name": "publicInputs",
          "type": "bytes32[]",
          "internalType": "bytes32[]"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "CountIncreased",
      "inputs": [
        {
          "name": "count",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    }
  ]
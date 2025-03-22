export const abi=  [
    {
      "type": "constructor",
      "inputs": [
        { "name": "_verifier", "type": "address", "internalType": "address" }
      ],
      "stateMutability": "nonpayable"
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
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "view"
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
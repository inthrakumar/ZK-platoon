// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {HonkVerifier} from "./contract.sol";

contract ZKPlatoon {
    HonkVerifier public verifier;

    constructor() {
        verifier = new HonkVerifier();
    }

    function verify(bytes calldata proof, bytes32[] calldata publicInputs) public view returns (bool) {
        return verifier.verify(proof, publicInputs);
    }
}
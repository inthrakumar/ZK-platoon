// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {HonkVerifier} from "./contract.sol";

contract ZKPlatoon {
    HonkVerifier public verifier;
    uint256 private count=0;
    event CountIncreased(uint256 count);

    constructor(address _verifier) {
        verifier = HonkVerifier(_verifier);
    }

    function verify(bytes calldata proof, bytes32[] calldata publicInputs) public view returns (bool) {
        return verifier.verify(proof, publicInputs);
    } 
    
}




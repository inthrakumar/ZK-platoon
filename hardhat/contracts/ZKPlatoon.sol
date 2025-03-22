// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {HonkVerifier} from "./contract.sol";
import "hardhat/console.sol";

contract ZKPlatoon {
    HonkVerifier public verifier;
    uint256 public count=0;
    event CountIncreased(uint256 count);

    constructor(address _verifier) {
        verifier = HonkVerifier(_verifier);
        console.log(_verifier);
    }

    function verify(bytes calldata proof, bytes32[] calldata publicInputs) public  {
        console.log("here");
        require(verifier.verify(proof, publicInputs),"Verification failed");
        count++;
        emit CountIncreased(count);
    }
    function Getcount() public view returns (uint256) {
        return count;
    }
}

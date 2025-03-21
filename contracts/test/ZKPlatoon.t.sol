// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {NoirHelper} from "../lib/foundry-noir-helper/src/NoirHelper.sol";
import {HonkVerifier} from "../src/contract.sol";
import {ZKPlatoon} from "../src/ZKPlatoon.sol";
import {console} from "forge-std/console.sol";

contract ContractTest is Test {
    ZKPlatoon public zkPlatoon;
    HonkVerifier public verifier;
    NoirHelper public noirHelper;

    function setUp() public {
        zkPlatoon = new ZKPlatoon();
        noirHelper = new NoirHelper();
        verifier = new HonkVerifier();
    }

    function test_verify() public {
        string[6] memory vehiclesFixed = ["A", "B", "C", "D", "E", "F"];
        string[] memory vehicles = new string[](6);
        for (uint i = 0; i < 6; i++) {
            vehicles[i] = vehiclesFixed[i];
        }

        string[][] memory vehicleResponses = new string[][](6);
        for (uint i = 0; i < 6; i++) {
            vehicleResponses[i] = new string[](2);
        }
        
        // Fill the 2D array according to your prover.toml format
        vehicleResponses[0][0] = "0";
        vehicleResponses[0][1] = "B";
        vehicleResponses[1][0] = "A";
        vehicleResponses[1][1] = "C";
        vehicleResponses[2][0] = "B";
        vehicleResponses[2][1] = "F";
        vehicleResponses[3][0] = "C";
        vehicleResponses[3][1] = "E";
        vehicleResponses[4][0] = "D";
        vehicleResponses[4][1] = "F";
        vehicleResponses[5][0] = "C";
        vehicleResponses[5][1] = "1";

        // Set the vehicle name
        string memory vehicle_name = "A";

        // Add inputs to NoirHelper
        noirHelper.withInput("vehicles", vehicles);
        noirHelper.withInput("Vehicle_Response", vehicleResponses);
        noirHelper.withInput("vehicle_name", vehicle_name);

        // Generate proof
        (bytes32[] memory publicInputs, bytes memory proof) = noirHelper.generateProof("test_verify", 3);

        console.log("Public Inputs:");
        for(uint256 i = 0; i < publicInputs.length; i++) {
            // Convert bytes32 to string for logging
            string memory inputStr = vm.toString(publicInputs[i]);
            console.log("Input %d: %s", i, inputStr);
        }

        // Debugging logs
        console.log("Generated Proof Length:", proof.length);
        console.log("Public Inputs Count:", publicInputs.length);

        // Verify the proof using the verifier contract
        bool result = verifier.verify(proof, publicInputs);
        
        // Ensure proof verification succeeds
        assertTrue(result, "Proof verification failed!");
    }
}

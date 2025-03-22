pragma solidity ^0.8.13;

import {HonkVerifier} from "../src/contract.sol";
import "../lib/forge-std/src/Script.sol";
import {ZKPlatoon} from "../src/ZKPlatoon.sol";
import {console} from "../lib/forge-std/src/console.sol";


contract Deploy is Script {
    function run() public  {
        HonkVerifier verifier = new HonkVerifier();
        ZKPlatoon platoon = new ZKPlatoon(address(verifier));
        console.log("Platoon deployed to: ", address(platoon));
    }
}

const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy HonkVerifier first
    const HonkVerifier = await ethers.getContractFactory("HonkVerifier");
    const honkVerifier = await HonkVerifier.deploy();
    await honkVerifier.waitForDeployment();

    // Deploy ZKPlatoon with HonkVerifier's address
    const ZKPlatoon = await ethers.getContractFactory("ZKPlatoon");
    const zkPlatoon = await ZKPlatoon.deploy(await honkVerifier.getAddress());
    await zkPlatoon.waitForDeployment();

    console.log("HonkVerifier Contract Address:", await honkVerifier.getAddress());
    console.log("ZKPlatoon Contract Address:", await zkPlatoon.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

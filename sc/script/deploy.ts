import { ethers } from "hardhat";

// async function main() {
//     const NFT = await ethers.getContractFactory("NFT");
//     const contract = await NFT.deploy("LISK NFT", "LNFT");

//     await contract.waitForDeployment();
//     console.log("Deployed to:", await contract.getAddress());
// }

// main().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
// });

// import { ethers } from "hardhat";


async function main() {
    const signer = await ethers.provider.getSigner();

    console.log("=======Deploying contract======")
    console.log("Deployer Address: ", signer.address)

    const token = await ethers.deployContract("NFT", ["LISK NFT", "LNFT"])
    await token.waitForDeployment()

    console.log("======Contract Deployed======")
    console.log("Contract Address: ", token.target)


}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})

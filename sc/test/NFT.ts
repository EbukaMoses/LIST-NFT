import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { NFT } from "../typechain-types";

describe("NFT", function () {
    let nft: NFT;
    let owner: SignerWithAddress;
    let addr1: SignerWithAddress;
    let addr2: SignerWithAddress;
    let otherAccount: SignerWithAddress;
    const name = "LISK NFT";
    const symbol = "LNFT";

    beforeEach(async function () {
        // Get signers
        // [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy contract
        // const NFT = await ethers.getContractFactory("NFT");
        // nft = await NFT.deploy(name, symbol);
        // await nft.waitForDeployment();

        // Contracts are deployed using the first signer/account by default
        [owner, otherAccount, addr1, addr2] = await ethers.getSigners();

        const NFT_CONTRACT = await ethers.getContractFactory("NFT");
        nft = await NFT_CONTRACT.deploy(name, symbol);

        return { nft, owner, otherAccount };
    });

    describe("Deployment", function () {
        it("Should set the right name and symbol", async function () {
            // const { nft } = await loadFixture(deployNFTFixture);
            expect(await nft.name()).to.equal(name);
            expect(await nft.symbol()).to.equal(symbol);
        });

        it("Should start with zero total supply", async function () {
            expect(await nft.totalSupply()).to.equal(0n);
        });
    });

    describe("Minting", function () {
        it("Should mint NFT and update balances correctly", async function () {
            await nft._mintNft(addr1.address);

            expect(await nft.ownerOf(0)).to.equal(addr1.address);
            expect(await nft.balanceOf(addr1.address)).to.equal(ethers.parseUnits("1", 9));
            expect(await nft.totalSupply()).to.equal(ethers.parseUnits("1", 9));
        });

        it("Should emit NftMinted event", async function () {
            await expect(nft._mintNft(addr1.address))
                .to.emit(nft, "NftMinted")
                .withArgs(addr1.address, 0);
        });
    });

    describe("Transfers", function () {
        beforeEach(async function () {
            await nft._mintNft(addr1.address);
        });

        it("Should transfer tokens between accounts", async function () {
            await nft.connect(addr1).transfer(addr2.address, ethers.parseUnits("0.5", 9));

            expect(await nft.balanceOf(addr2.address)).to.equal(ethers.parseUnits("0.5", 9));
            expect(await nft.balanceOf(addr1.address)).to.equal(ethers.parseUnits("0.5", 9));
        });

        it("Should fail if sender doesn't have enough tokens", async function () {
            await expect(
                nft.connect(addr2).transfer(addr1.address, ethers.parseUnits("1", 9))
            ).to.be.revertedWith("Insufficient balance");
        });
    });

    describe("Allowances", function () {
        beforeEach(async function () {
            await nft._mintNft(addr1.address);
        });

        it("Should allow approved spender to transfer tokens", async function () {
            await nft.connect(addr1).approve(addr2.address, ethers.parseUnits("0.5", 9));
            await nft.connect(addr2).transferFrom(
                addr1.address,
                addr2.address,
                ethers.parseUnits("0.5", 9)
            );

            expect(await nft.balanceOf(addr2.address)).to.equal(ethers.parseUnits("0.5", 9));
        });

        it("Should fail if spender doesn't have enough allowance", async function () {
            await expect(
                nft.connect(addr2).transferFrom(
                    addr1.address,
                    addr2.address,
                    ethers.parseUnits("1", 9)
                )
            ).to.be.revertedWith("Insufficient allowance");
        });
    });

    describe("Token URI", function () {
        it("Should set and return correct base URI", async function () {
            const baseURI = "ipfs://QmTest/";
            await nft.setBaseURI(baseURI);

            await nft._mintNft(addr1.address);
            expect(await nft.tokenURI(0)).to.equal(baseURI + "0");
        });
    });
}); 
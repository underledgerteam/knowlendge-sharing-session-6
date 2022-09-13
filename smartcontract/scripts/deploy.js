// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    const SimpleBank = await hre.ethers.getContractFactory("SimpleBank");
    const MERC20 = await hre.ethers.getContractFactory("MERC20");
    const MERC721 = await hre.ethers.getContractFactory("MERC721");

    const simpleBank = await SimpleBank.deploy();
    const mERC20 = await MERC20.deploy();
    const mERC721 = await MERC721.deploy();

    await simpleBank.deployed();
    await mERC20.deployed();
    await mERC721.deployed();

    console.log(`deployed simpleBank to ${simpleBank.address}`);
    console.log(`deployed mERC20 to ${mERC20.address}`);
    console.log(`deployed mERC721 to ${mERC721.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
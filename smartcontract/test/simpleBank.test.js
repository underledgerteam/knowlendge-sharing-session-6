const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('TEST SIMPLE BANK', () => {
  let user1, user2;
  let simpleBank;
  let hacker;

  beforeEach(async () => {
    [user1, user2] = await ethers.getSigners();

    const SimpleBank = await ethers.getContractFactory('SimpleBank');
    simpleBank = await SimpleBank.deploy();

    const Hacker = await ethers.getContractFactory('Hacker');
    hacker = await Hacker.deploy(simpleBank.address);
  });

  it('User can deposit', async () => {
    await simpleBank
      .connect(user1)
      .deposit({ from: user1.address, value: '1000000000000000000' });

    await expect(await simpleBank.balances(user1.address)).to.equal(
      '1000000000000000000',
    );
  });

  it('User can withdraw', async () => {
    await simpleBank
      .connect(user1)
      .deposit({ from: user1.address, value: '1000000000000000000' });

    await simpleBank.connect(user1).withdraw();

    await expect(await ethers.provider.getBalance(simpleBank.address)).to.equal(
      '0',
    );
  });

  it('Hacker can deposit', async () => {
    await simpleBank
      .connect(user1)
      .deposit({ from: user1.address, value: '2000000000000000000' });

    await hacker
      .connect(user2)
      .attack({ from: user2.address, value: '1000000000000000000' });

    await expect(await ethers.provider.getBalance(hacker.address)).to.equal(
      '3000000000000000000',
    );

    await expect(await simpleBank.balances(user1.address)).to.equal(
      '2000000000000000000',
    );

    await expect(await ethers.provider.getBalance(simpleBank.address)).to.equal(
      '0',
    );
  });

  it('Hacker can withdraw', async () => {
    await simpleBank
      .connect(user1)
      .deposit({ from: user1.address, value: '2000000000000000000' });

    await hacker
      .connect(user2)
      .attack({ from: user2.address, value: '1000000000000000000' });

    await hacker.connect(user2).withdraw();

    await expect(await ethers.provider.getBalance(hacker.address)).to.equal(
      '0',
    );
  });
});

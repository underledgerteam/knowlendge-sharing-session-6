const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('TEST MERC20 TOKEN', () => {
  let user1;
  let token;

  beforeEach(async () => {
    [user1] = await ethers.getSigners();

    const MERC20 = await ethers.getContractFactory('MERC20');
    token = await MERC20.deploy();
  });

  it('User can deposit', async () => {
    await token
      .connect(user1)
      .deposit({ from: user1.address, value: '1000000000000000000' });

    await expect(await token.balanceOf(user1.address)).to.equal(
      '1000000000000000000',
    );

    await expect(await ethers.provider.getBalance(token.address)).to.equal(
      '1000000000000000000',
    );
  });

  it('User can withdraw', async () => {
    await token
      .connect(user1)
      .deposit({ from: user1.address, value: '1000000000000000000' });

    await token.connect(user1).approve(token.address, '1000000000000000000');

    await token.connect(user1).withdraw('1000000000000000000');

    await expect(await token.balanceOf(user1.address)).to.equal('0');

    await expect(await ethers.provider.getBalance(token.address)).to.equal('0');
  });
});

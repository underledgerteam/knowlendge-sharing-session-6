const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('TEST MERC721 TOKEN', () => {
  let user1;
  let token;

  beforeEach(async () => {
    [user1] = await ethers.getSigners();

    const MERC721 = await ethers.getContractFactory('MERC721');
    token = await MERC721.deploy();
  });

  it('User can mint', async () => {
    await token.connect(user1).mint(1);
  });
});

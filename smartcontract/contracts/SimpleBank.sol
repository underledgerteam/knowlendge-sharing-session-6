// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract SimpleBank {

    mapping (address => uint256) public  balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public returns (uint256 remainingBal) {

        uint256 bal =  balances[msg.sender];


        (bool send,) = msg.sender.call{value: bal}("");

        require(send, "Failed to send Ether");

        balances[msg.sender] = 0;

        return balances[msg.sender];
    }

}

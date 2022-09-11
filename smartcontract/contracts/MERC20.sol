// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./openzeppelin/token/ERC20/ERC20.sol";
import "./openzeppelin/token/ERC20/IERC20.sol";

contract MERC20 is ERC20 {

    constructor() ERC20("M Token", "MTK"){}

    mapping (address => uint256) public balances;

    function deposit() external payable {
        require(msg.value > 0, "Ether must be more than 0");
        _mint(msg.sender, msg.value);
        balances[msg.sender] += msg.value;
    }    
    

    function withdraw(uint256 amount) external {

        require(amount > 0, "Amount must be more than 0");
        require(balances[msg.sender] >= amount, "User balances  must be more than amount");

        transfer(address(this), amount);

        _burn(address(this), amount);
        

        balances[msg.sender] -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success , "Failed to send Ether");
    }



}
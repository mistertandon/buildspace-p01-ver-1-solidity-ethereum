// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "hardhat/console.sol";

contract WavePortal{
    uint totalWaves;

    constructor(){
        console.log("I am a Contrac and I'm smart.");
    }

    function wave() public {

        totalWaves+=1;
        console.log("%s has waved", msg.sender);
    }

    function getTotalWaves() public view returns(uint){

        console.log("He has %d total waves ", totalWaves);
        return totalWaves;
    }
}
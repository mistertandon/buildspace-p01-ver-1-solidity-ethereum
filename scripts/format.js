import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import abi from "./utils/WavePortal.json";
console.log("abi", abi);

const App = () => {
  const [accounts, setAccount] = useState("");

  const contractAddress = "	0x23504c5956da9855edad5182c3e4f3351c5bb449";

  const { abi: contractABI } = abi;

  const checkWalletConnection = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        console.log("Wallet is not connected");
      } else {
        console.log("Wallet is connected");
      }

      const accountsRef = await ethereum.request({ account: "eth_accounts" });

      if (Array.isArray(accountsRef) && accountsRef.length > 0) {
        setAccount(accountsRef[0]);
        console.log(`found an authorized account : ${accountsRef[0]}`);
      } else {
        console.log("Couldn't find ETH account");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await checkWalletConnection();
    })();
  }, []);

  const walletConnection = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Wallet not found");
    }

    const accountsRef = await ethereum.request({
      method: "eth_requestAccounts",
    });

    console.log(`accountsRef: ${accountsRef}`);
    console.log("typof accountsRef:", typeof accountsRef);
    console.log("typof accountsRef:", accountsRef[0]);
    setAccount(accountsRef[0]);
  };

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let count = await wavePortalContract.getTotalWaves();
        console.log(`Retrieved total count wave : ${count}`);

        const waveTxn = await wavePortalContract.wave();
        console.log(`Mining: ${waveTxn.hash}`);

        await waveTxn.wait();
        console.log(`Mined: ${waveTxn.hash}`);

        count = await wavePortalContract.getTotalWaves();
        console.log(`Retrieved total numbe rof waves: ${count}`);
      } else {
        console.log(`Ethereum object does not exist`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">👋 Hey there!</div>

        <div className="bio">
          I am farza and I worked on self-driving cars so that's pretty cool
          right? Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
        <button className="waveButton" onClick={walletConnection}>
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default App;

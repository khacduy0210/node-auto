import React, { useEffect } from "react";
import { ethers } from "ethers";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
import {message} from "antd";
import Web3 from 'web3';

declare let window: any;

const NODE_URL = "https://speedy-nodes-nyc.moralis.io/9e088ea59c59ea57aa3a0075/bsc/testnet";

type StartPaymentProps = {
  setError: any;
  setTxs: any;
  ether: any;
  addr: any;
}

const startPayment = async ({ setError, setTxs, ether, addr, ...props }: StartPaymentProps) => {
  try {
    await window?.ethereum.send("eth_requestAccounts");
    const web3 = new Web3('https://bsc-dataseed1.binance.org:8545');
    // const provider = new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
    // const NODE_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545';
    //  const provider = new ethers.providers.JsonRpcProvider(NODE_URL);
    // const signer = provider.getSigner();
    // console.log(window.ethereum.selectedAddress)
    // console.log(ethers.utils.getAddress(addr));
    // const tx = await signer.sendTransaction({
    //   from: window.ethereum.selectedAddress,
    //   to: addr,
    //   value: ethers.utils.parseEther(ether)
    // });
    // console.log({ ether, addr });
    // console.log("tx", tx);
    // setTxs([tx]);
    window.ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: window.ethereum.selectedAddress,
          to: addr,
          value: ethers.utils.parseEther(ether).toString(),
          // asset:"PAYZ",
          // networkId:"bbc-testnet",

        },
      ],
    })
    .then(() => {
      message.success("payment success");})
    .catch((error: any) => message.error(error.message));
    
  } catch (err: any) {
    setError(err.message);
    console.log(err);
    message.error(err?.message);
  }
};

export default function App() {
  const [error, setError] = useState('');
  const [txs, setTxs] = useState([]);
  let web3 = new Web3(new Web3.providers.HttpProvider(NODE_URL))
  useEffect(() => {
    web3.eth.getBlockNumber()
      .then(function(blockNumber) {
        console.log(blockNumber)
      })
  },[])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError('');
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr")
    });
  };

  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Send ETH payment
          </h1>
          <div className="">
            <div className="my-3">
              <input
                type="text"
                name="addr"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Contract Address"
              />
            </div>
            <div className="my-3">
              <input
                name="ether"
                type="text"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Amount"
              />
            </div>
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Pay now
          </button>
          {/* <ErrorMessage message={error} /> */}
          {/* <TxList txs={txs} /> */}
        </footer>
      </div>
    </form>
  );
}

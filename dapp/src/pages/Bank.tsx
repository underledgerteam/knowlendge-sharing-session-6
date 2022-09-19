import { FC, useState, useEffect, useContext } from "react";
import { ethers } from "ethers";

import { Web3Context } from "src/contexts/web3.context";
import { SIMPLE_BANK_ADRESS, SIMPLE_BANK_ABI } from "src/utils/constants";
import MyButton from "src/components/MyButton";

const { ethereum } = window;

const Bank: FC = () => {
  // #1 initial variable
  // const { walletAddress, walletBalance, getWalletBalance } = useContext(Web3Context);
  // const [balance, setBalance] = useState("");
  // const [deposit, setDeposit] = useState("");

  // #5 handle change input value 
  // const handleChangeDeposit = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setDeposit(e.target.value);
  // };

  /* 
    #1 function for prepare Contract object for use later.
    If you are familiar with Databases, this is similar to an Object Relational Mapper(ORM).
  */
  // const initContract = () => {
  //   const provider = new ethers.providers.Web3Provider(ethereum);
  //   const signer = provider.getSigner();
  //   const simpleBankContract = new ethers.Contract(SIMPLE_BANK_ADRESS, SIMPLE_BANK_ABI, signer);
  //   return simpleBankContract;
  // };

  // #spare  in case of tx error about gas
  // const getGasPrice = async () => {
  //   const provider = new ethers.providers.Web3Provider(ethereum);
  //   const gasPrice = await provider.getGasPrice();
  //   console.log('gasPrice', ethers.utils.formatUnits(gasPrice, "gwei"));
  //   return gasPrice;
  // };

  // #2 function to get balance in contract.
  // const getBalance = async (): Promise<void> => {
  //   const contract = initContract();
  //   let result = await contract.balance();
  //   // let result = await contract.balances(walletAddress);
  //   console.log('getBalance', result);
  //   console.log('getBalance', ethers.utils.formatUnits(result));
  //   setBalance(ethers.utils.formatUnits(result));
  // };

  // #4 function to get balance in contract and wallet balance.
  // const refreshBalance = async () => {
  //   await Promise.all([
  //     getWalletBalance(),
  //     getBalance()
  //   ]);
  // };

  // #auto refresh
  // const waitForTx = async (txHash: string) => {
  //   const provider = new ethers.providers.Web3Provider(ethereum);
  //   const result = await provider.waitForTransaction(txHash);
  //   console.log('waitForTransaction', result);
  //   await refreshBalance();
  // };

  // #5 using deposit
  // After this function tx is created but not mean it mined.
  // have to wait tx mined then this tx will write to blockchain.
  // then use refreshBalance() to get current value
  // const handleDeposit = async (): Promise<void> => {
  //   try {
  //     const tx = {
  //       value: ethers.utils.parseEther(deposit)
  //     };
  //     const contract = initContract();
  //     const result = await contract.deposit({ ...tx });
  //     console.log('handleDeposit', result);
  //     // await waitForTx(result.hash);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // #6 using withdraw
  // const handleWithdraw = async (): Promise<void> => {
  //   try {
  //     const contract = initContract();
  //     const result = await contract.withdraw();
  //     console.log('handleWithdraw', result);
  //     // await waitForTx(result.hash);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // #3 get bank balance
  // useEffect(() => {
  //   const init = async () => {
  //     if (walletAddress) {
  //       await getBalance();
  //     }
  //   };
  //   init();
  // }, [walletAddress]);

  // if (!walletAddress) {
  //   return (
  //     <div className="h-[90vh] p-4 text-center bg-slate-700">
  //       <div className="w-10/12 md:w-9/12 mx-auto my-4 p-4 border border-white bg-gray-100 text-2xl">
  //         Please connect wallet
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="h-[90vh] p-4 text-center bg-slate-700">

      {/* #4 */}
      <div className="w-10/12 md:w-9/12 mx-auto my-4 p-4 border border-white bg-gray-100">
        <p className="text-2xl">info</p>
        {/* <div className="text-2xl">
          address : {`${walletAddress || `...`}`}
        </div>
        <div className="text-2xl">
          balance : {`${walletBalance || 0} ETH`}
        </div>
        <div className="text-2xl">
          bank balance : {`${balance || 0} ETH`}
        </div>
        <MyButton id="updateBalanceButton" name="updateBalanceButton" className="mt-4" text="REFRESH" onClick={refreshBalance} /> */}
      </div>

      {/* #5 */}
      <div className="w-10/12 md:w-9/12 mx-auto my-4 p-4 border border-white bg-gray-100">
        <p className="text-2xl">deposit</p>
        {/* <input
          name="deposit"
          className="mt-4 p-2 outline-none border text-lg white-glassmorphism rounded-sm"
          type="number"
          value={deposit}
          placeholder="input deposit"
          onChange={handleChangeDeposit}
        />
        <MyButton id="depositButton" name="depositButton" className="mx-2" text="DEPOSIT" onClick={handleDeposit} /> */}
      </div>

      {/* #6 */}
      <div className="w-10/12 md:w-9/12 mx-auto my-4 p-4 border border-white bg-gray-100">
        <p className="text-2xl">withdraw all bank balance</p>
        {/* <MyButton id="withdrawButton" name="withdrawButton" className="mt-4" text="WITHDRAW" onClick={handleWithdraw} /> */}
      </div>

    </div>
  );
};
export default Bank;
import { FC, useState, useEffect, useContext } from "react";
import { ethers } from "ethers";

import { Web3Context } from "src/contexts/web3.context";
import { SIMPLE_BANK_ADRESS, SIMPLE_BANK_ABI } from "src/utils/constants";

const { ethereum } = window;

const Bank: FC = () => {
  // #1
  const { walletAddress, walletBalance, getWalletBalance } = useContext(Web3Context);
  const [balance, setBalance] = useState("");
  const [deposit, setDeposit] = useState("");

  // #1 handle change input value 
  const handleChangeDeposit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeposit(e.target.value);
  };

  // #3
  const initContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const simpleBankContract = new ethers.Contract(SIMPLE_BANK_ADRESS, SIMPLE_BANK_ABI, signer);
    return simpleBankContract;
  };

  // #spare  in case of tx error about gas
  // const getGasPrice = async () => {
  //   const provider = new ethers.providers.Web3Provider(ethereum);
  //   const gasPrice = await provider.getGasPrice();
  //   console.log('gasPrice', ethers.utils.formatUnits(gasPrice, "gwei"));
  //   return gasPrice;
  // };

  // #4
  const getBalance = async (): Promise<void> => {
    const contract = initContract();
    let result = await contract.balance();
    // let result = await contract.balances(walletAddress);
    // console.log('getBalance', ethers.utils.formatUnits(result));
    setBalance(ethers.utils.formatUnits(result));
  };

  // #5
  const refreshBalance = async () => {
    await Promise.all([
      getWalletBalance(),
      getBalance()
    ]);
  };

  // #5
  const waitForTx = async (txHash: string) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const result = await provider.waitForTransaction(txHash);
    console.log('waitForTransaction', result);
    await refreshBalance();
  };

  // #6
  const handleDeposit = async (input: string): Promise<void> => {
    try {
      const tx = {
        value: ethers.utils.parseEther(input)
      };
      const contract = initContract();
      const result = await contract.deposit({ ...tx });
      // console.log('deposit', result);
      await waitForTx(result.hash);
    } catch (error) {
      console.log(error);
    }
  };

  // #7
  const handleWithdraw = async (): Promise<void> => {
    try {
      const contract = initContract();
      const result = await contract.withdraw();
      // console.log('withdraw', result);
      await waitForTx(result.hash);
    } catch (error) {
      console.log(error);
    }
  };

  // #2
  useEffect(() => {
    const init = async () => {
      if (walletAddress) {
        await getBalance();
      }
    };
    init();
  }, [walletAddress]);

  if (!walletAddress) {
    return (
      <div className="h-[90vh] p-4 text-center bg-slate-700">
        <div className="w-10/12 md:w-6/12 mx-auto my-4 p-4 border border-white bg-gray-100">
          Please connect wallet
        </div>
      </div>
    );
  }

  return (
    <div className="h-[90vh] p-4 text-center bg-slate-700">
      <div className="w-10/12 md:w-6/12 mx-auto my-4 p-4 border border-white bg-gray-100">
        <div>
          address : {`${walletAddress || `...`}`}
        </div>
        <div>
          balance : {`${walletBalance || 0} ETH`}
        </div>
        <input
          name="deposit"
          className="p-2 outline-none border text-lg white-glassmorphism rounded-sm"
          type="number"
          value={deposit}
          placeholder="input deposit"
          onChange={handleChangeDeposit}
        />
        <button
          id="depositButton"
          className="mx-2 px-4 py-2 bg-blue-400 text-lg"
          onClick={() => handleDeposit(deposit)}
        >
          DEPOSIT
        </button>
      </div>

      <div className="w-10/12 md:w-6/12 mx-auto my-4 p-4 border border-white bg-gray-100">
        <div>
          bank balance : {`${balance || 0} ETH`}
          <button
            id="withdrawButton"
            className="mx-2 px-4 py-2 bg-blue-400 text-lg"
            onClick={() => handleWithdraw()}
          >
            WITHDRAW
          </button>
        </div>
      </div>
      {/* 
      <div className="w-10/12 md:w-6/12 mx-auto my-4 p-4 border border-white bg-gray-100">
        <button
          id="updateBalanceButton"
          className="mx-2 px-4 py-2 bg-blue-400 text-lg"
          onClick={() => refreshBalance()}
        >
          Refresh
        </button>
      </div>
       */}
    </div>
  );
};
export default Bank;
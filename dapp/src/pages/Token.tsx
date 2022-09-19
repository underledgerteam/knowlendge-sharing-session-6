import { FC, useEffect, useState, useContext } from "react";
import { ethers } from "ethers";

import { Web3Context } from "src/contexts/web3.context";
import { TOKEN_ADDRESS, TOKEN_ABI } from "src/utils/constants";
import MyButton from "src/components/MyButton";

const { ethereum } = window;

const Token: FC = () => {
  // #1
  const { walletAddress, walletBalance, getWalletBalance } = useContext(Web3Context);
  const [balance, setBalance] = useState("");
  const [allowance, setAllowance] = useState("");
  const [symbol, setSymbol] = useState("");
  const [deposit, setDeposit] = useState("");
  const [withdraw, setWithdraw] = useState("");

  // #1
  const initContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const tokenContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
    return tokenContract;
  };

  // #2
  const getSymbol = async () => {
    const contract = initContract();
    const result = await contract.symbol();
    // console.log('getSymbol', result);
    setSymbol(result);
  };
  const getBalance = async (): Promise<void> => {
    const contract = initContract();
    const result = await contract.balanceOf(walletAddress);
    // let result = await contract.balances(walletAddress);
    // console.log('getBalance', ethers.utils.formatUnits(result));
    setBalance(ethers.utils.formatUnits(result));
  };
  const getAllowance = async () => {
    const contract = initContract();
    const result = await contract.allowance(walletAddress, TOKEN_ADDRESS);
    // console.log('getAllowance', ethers.utils.formatUnits(result));
    setAllowance(ethers.utils.formatUnits(result));
  };

  // #3
  const handleApprove = async () => {
    try {
      const approveValue = ethers.utils.parseEther(deposit);
      const contract = initContract();
      const result = await contract.approve(TOKEN_ADDRESS, approveValue);
      // console.log('approve', result);
      return result;
    } catch (error) {
      console.log('handleApprove error', error);
    }
  };

  // #4
  const handleDeposit = async (): Promise<void> => {
    try {
      const tx = {
        value: ethers.utils.parseEther(deposit)
      };
      const contract = initContract();
      const result = await contract.deposit({ ...tx });
      // console.log('deposit', result);
    } catch (error) {
      console.log('handleDeposit error', error);
    }
  };

  // #5 approve b4 deposit
  // show case hack?
  const depositService = async () => {
    if (parseFloat(deposit) > parseFloat(allowance)) {
      // ask for approve
      const approveResult = await handleApprove();
      if (approveResult) {
        await handleDeposit();
      }
    } else {
      await handleDeposit();
    }
    // case hack
    // handleDeposit();
  };

  // #6
  const handleWithdraw = async (): Promise<void> => {
    try {
      const amount = ethers.utils.parseEther(withdraw);
      const contract = initContract();
      const result = await contract.withdraw(amount);
      // console.log('withdraw', result);
    } catch (error) {
      console.log('handleWithdraw error', error);
    }
  };

  // #2
  const handleRefresh = async () => {
    await Promise.all([
      getBalance(),
      getAllowance(),
      getWalletBalance(),
    ]);
  };

  // #2
  useEffect(() => {
    const init = async () => {
      if (walletAddress) {
        await Promise.all([
          getBalance(),
          getAllowance(),
          getSymbol(),
        ]);
      }
    };
    init();
  }, [walletAddress]);

  return (
    <div className="h-[90vh] p-4 text-center bg-slate-700">

      {/* #2 */}
      <div className="w-10/12 md:w-9/12 mx-auto my-4 p-4 border border-white bg-gray-100 text-2xl">
        <div>
          address : {`${walletAddress || `...`}`}
        </div>
        <div>
          wallet balance : {`${walletBalance || 0} ETH`}
        </div>
        <div>
          allowance : {`${allowance || 0} ETH`}
        </div>
        <div>
          token balance : {`${balance || 0} ${symbol}`}
        </div>
        <MyButton id="updateBalanceButton" name="updateBalanceButton" className="mt-4" text="REFRESH" onClick={handleRefresh} />
      </div>

      {/* #5 */}
      <div className="w-10/12 md:w-9/12 mx-auto my-4 p-4 border border-white bg-gray-100">
        <div>
          <input
            name="deposit"
            className="w-6/12 p-2 outline-none border text-lg white-glassmorphism rounded-sm"
            type="number"
            value={deposit}
            placeholder="input deposit"
            onChange={e => setDeposit(e.target.value)}
          />
          <MyButton id="depositButton" name="depositButton" className="mx-2" text="DEPOSIT" onClick={depositService} />
        </div>
      </div>

      {/* #6 */}
      <div className="w-10/12 md:w-9/12 mx-auto my-4 p-4 border border-white bg-gray-100">
        <div>
          <input
            name="withdraw"
            className="w-6/12 p-2 outline-none border text-lg white-glassmorphism rounded-sm"
            type="number"
            value={withdraw}
            placeholder="input withdraw"
            onChange={e => setWithdraw(e.target.value)}
          />
          <MyButton id="withdrawButton" name="withdrawButton" className="mx-2" text="WITHDRAW" onClick={handleWithdraw} />
        </div>
      </div>

    </div>
  );
};
export default Token;
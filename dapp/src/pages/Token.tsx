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
    console.log('getSymbol', result);
    setSymbol(result);
  };
  const getBalance = async (): Promise<void> => {
    const contract = initContract();
    const result = await contract.balanceOf(walletAddress);
    // let result = await contract.balances(walletAddress);
    console.log('getBalance', ethers.utils.formatUnits(result));
    setBalance(ethers.utils.formatUnits(result));
  };

  // #3
  const handleDeposit = async (): Promise<void> => {
    try {
      const tx = {
        value: ethers.utils.parseEther(deposit)
      };
      const contract = initContract();
      const result = await contract.deposit({ ...tx });
      console.log('deposit', result);
    } catch (error) {
      console.log('handleDeposit error', error);
    }
  };

  // #4
  const handleWithdraw = async (): Promise<void> => {
    try {
      const amount = ethers.utils.parseEther(withdraw);
      const contract = initContract();
      const result = await contract.withdraw(amount);
      console.log('withdraw', result);
    } catch (error) {
      console.log('handleWithdraw error', error);
    }
  };

  // #2
  const handleRefresh = async () => {
    await Promise.all([
      getBalance(),
      getWalletBalance(),
    ]);
  };

  // #2
  useEffect(() => {
    const init = async () => {
      if (walletAddress) {
        await Promise.all([
          getBalance(),
          getSymbol(),
        ]);
      }
    };
    init();
  }, [walletAddress]);

  return (
    <div className="h-[90vh] p-4 text-center bg-slate-700">

      <div className="w-10/12 md:w-9/12 mx-auto my-4 p-4 border border-white bg-gray-100 text-2xl">
        <p className="text-2xl">info</p>
        {/* #2 */}
        <div className="break-all">
          address : {`${walletAddress || `...`}`}
        </div>
        <div className="break-all">
          wallet balance : {`${walletBalance || `...`} ETH`}
        </div>
        <div className="break-all">
          token balance : {`${balance || `...`} ${symbol}`}
        </div>
        <MyButton id="updateBalanceButton" name="updateBalanceButton" className="mt-4" text="REFRESH" onClick={handleRefresh} />
      </div>

      <div className="w-10/12 md:w-9/12 mx-auto my-4 p-4 border border-white bg-gray-100">
        <p className="text-2xl">{`Mint ${symbol} from ETH`}</p>
        {/* #3 */}
        <div>
          <input
            name="deposit"
            className="w-6/12 p-2 outline-none border text-lg white-glassmorphism rounded-sm"
            type="number"
            value={deposit}
            placeholder="input mint amount"
            onChange={e => setDeposit(e.target.value)}
          />
          <MyButton id="depositButton" name="depositButton" className="mx-2" text="MINT" onClick={handleDeposit} />
        </div>
      </div>

      <div className="w-10/12 md:w-9/12 mx-auto my-4 p-4 border border-white bg-gray-100">
        <p className="text-2xl">{`Convert ${symbol} back to ETH`}</p>
        {/* #4 */}
        <div>
          <input
            name="withdraw"
            className="w-6/12 p-2 outline-none border text-lg white-glassmorphism rounded-sm"
            type="number"
            value={withdraw}
            placeholder="input convert amount"
            onChange={e => setWithdraw(e.target.value)}
          />
          <MyButton id="withdrawButton" name="withdrawButton" className="mx-2" text="CONVERT" onClick={handleWithdraw} />
        </div>
      </div>

    </div>
  );
};
export default Token;
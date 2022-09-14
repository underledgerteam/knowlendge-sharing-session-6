import { FC, useContext } from "react";
import { Web3Context } from "src/contexts/web3.context";

const ConnectButton = () => {
  const { walletAddress, handleConnectWallet } = useContext(Web3Context);
  if (walletAddress) {
    return (
      <div className="text-2xl text-white">
        Connected
      </div>
    );
  }
  return (
    <button
      id="connectButton"
      type="button"
      className="px-8 py-2 bg-blue-400 text-xl rounded"
      onClick={() => handleConnectWallet()}
    >
      Connect Wallet
    </button>
  );
};

const MyNavbar: FC = () => {
  return (
    <nav className="w-full h-[10vh] flex justify-between items-center p-4 bg-slate-900">
      <a className="flex-initial justify-center items-center font-bold text-4xl text-white" href="/">
        Workshop
      </a>
      <ul className="flex pl-8 list-style-none mr-auto">
        <li className="nav-item p-6">
          <a className="text-2xl text-white hover:text-gray-700 focus:text-gray-700" href="bank">Bank</a>
        </li>
        <li className="nav-item p-6">
          <a className="text-2xl text-white hover:text-gray-700 focus:text-gray-700" href="token">Token</a>
        </li>
        <li className="nav-item p-6">
          <a className="text-2xl text-white hover:text-gray-700 focus:text-gray-700" href="nft">NFT</a>
        </li>
      </ul>
      <ConnectButton />
    </nav>
  );
};

export default MyNavbar;
import { useState, useEffect, createContext } from 'react';
import { ethers } from "ethers";
import { GOERLI_CHAIN_ID } from 'src/utils/constants';

interface ProviderInterface {
  children: JSX.Element;
};

export interface Web3ContextInterface {
  walletAddress: string;
  walletBalance: string;
  supportChain: boolean;
  handleConnectWallet: Function;
  getWalletBalance: Function;
}

const defaultValue: Web3ContextInterface = {
  walletAddress: "",
  walletBalance: "",
  supportChain: false,
  handleConnectWallet: () => { },
  getWalletBalance: () => { },
};

const { ethereum } = window;

export const Web3Context = createContext<Web3ContextInterface>(defaultValue);

export const Web3Provider = ({ children }: ProviderInterface) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [supportChain, setSupportChain] = useState(false);

  // check browser have wallet extension
  const checkWalletIsConnected = async (): Promise<void> => {
    try {
      if (!ethereum) {
        alert('Please install Metamask!');
        return;
      }
      // get wallet data
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
    } catch (e) {
      console.log('checkWalletIsConnected', e);
    }
  };

  const checkIsSupportedChain = async (): Promise<void> => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();
      setSupportChain(GOERLI_CHAIN_ID === chainId)
    } catch (e) {
      console.log('checkIsSupportedChain', e);
    }
  }

  // get wallet balance
  const getWalletBalance = async (): Promise<void> => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const balance = await provider.getBalance(walletAddress);
    setWalletBalance(ethers.utils.formatEther(balance));
  };

  // connect wallet
  const handleConnectWallet = async (): Promise<void> => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.send("eth_requestAccounts", []);
    } catch (e) {
      console.error(e);
    }
  };

  // # extra
  const handleAccountChange = (accounts: Array<string>): void => {
    if (accounts.length > 0) {
      setWalletAddress(accounts[0]);
    } else {
      window.location.reload();
    }
  };
  const handleChainChange = async (): Promise<void> => {
    await checkIsSupportedChain();
  };

  useEffect(() => {
    const init = async () => {
      // # extra
      ethereum?.on("accountsChanged", handleAccountChange);
      ethereum?.on("chainChanged", handleChainChange);

      await checkWalletIsConnected();

      if (walletAddress) {
        await getWalletBalance();
        await checkIsSupportedChain();
      }
    };
    init();
    return () => {
      // # extra
      ethereum?.removeListener("accountsChanged", handleAccountChange);
      ethereum?.removeListener("chainChanged", handleChainChange);
    };
  }, [walletAddress]);

  return (
    <Web3Context.Provider
      value={{
        walletAddress,
        walletBalance,
        supportChain,
        handleConnectWallet,
        getWalletBalance
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
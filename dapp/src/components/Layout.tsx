import { FC, useContext } from 'react';
import { Outlet } from "react-router-dom";
import { Web3Context } from "src/contexts/web3.context";
import Navbar from 'src/components/Navbar';

const Layout: FC = () => {
  const { walletAddress, supportChain } = useContext(Web3Context);

  const Content = () => {
    if (!walletAddress) {
      return (
        <div className="h-[90vh] p-4 text-center bg-slate-700">
          <div className="w-10/12 md:w-9/12 mx-auto my-4 p-4 border border-white bg-gray-100 text-2xl">
            Please connect wallet
          </div>
        </div>
      );
    }
    if (!supportChain) {
      return (
        <div className="h-[90vh] p-4 text-center bg-slate-700">
          <div className="w-10/12 md:w-9/12 mx-auto my-4 p-4 border border-white bg-gray-100 text-2xl">
            Please change to Goerli Test Network
          </div>
        </div>
      );
    }
    return (
      <Outlet />
    );
  }

  return (
    <div className="min-h-screen min-w-screen bg-slate-700">
      <Navbar />
      <Content />
    </div>
  );
};

export default Layout;
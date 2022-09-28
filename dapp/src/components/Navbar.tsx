import { FC, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Web3Context } from "src/contexts/web3.context";
import MyButton from "src/components/MyButton";

const navData = [
  {
    name: "Bank",
    href: "/bank",
  },
  {
    name: "Token",
    href: "/token",
  },
  {
    name: "NFT",
    href: "/nft",
  }
];

// #1 Connect wallet button
const ConnectButton = () => {
  const { walletAddress, handleConnectWallet } = useContext(Web3Context);
  if (walletAddress) {
    return (
      <div className="text-2xl text-white font-bold">
        Connected
      </div>
    );
  }
  return (
    <MyButton id="connectButton" name="connectButton" className="px-8 py-2" text="CONNECT WALLET" onClick={handleConnectWallet} />
  );
};

const NavMenu = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex pl-8 list-style-none mr-auto">
      {navData.map(item => {
        const { name, href } = item;
        const isActive = (pathname === href) ? "font-bold underline" : "font-normal";
        return (
          <Link key={name} to={href} className="p-6">
            <div className={`text-2xl ${isActive} text-white hover:text-gray-700 focus:text-gray-700`}>
              {name}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

const MyNavbar: FC = () => {
  return (
    <nav className="w-full h-[10vh] flex justify-between items-center p-4 bg-slate-900">
      <Link key="home" to="/">
        <div className="flex-initial justify-center items-center font-extrabold text-4xl text-white">
          Workshop
        </div>
      </Link>
      <NavMenu />
      {/* #2 uncomment ConnectButton */}
      <ConnectButton />
    </nav>
  );
};

export default MyNavbar;
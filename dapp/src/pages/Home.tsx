import { FC } from "react";
import { SIMPLE_BANK_ADRESS, TOKEN_ADDRESS, NFT_ADDRESS } from "src/utils/constants";

const Home: FC = () => {
  return (
    <div className="h-full p-4 text-center bg-slate-700 text-2xl text-white">

      <div className="">
        Workshop Repo :
        <a
          className="underline"
          href="https://github.com/underledgerteam/knowlendge-sharing-session-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/underledgerteam/knowlendge-sharing-session-6
        </a>
      </div>

      <div>
        Completed Repo :
        <a
          className="underline"
          href="https://github.com/underledgerteam/knowlendge-sharing-session-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/underledgerteam/knowlendge-sharing-session-6
        </a>
      </div>

      <div className="">
        ETH Faucet :
        <a
          className="underline"
          href="https://goerlifaucet.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://goerlifaucet.com/
        </a>
      </div>

      <div className="">
        Bank Contract :
        <a
          className="underline"
          href={`https://goerli.etherscan.io/address/${SIMPLE_BANK_ADRESS}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {`https://goerli.etherscan.io/address/${SIMPLE_BANK_ADRESS}`}
        </a>
      </div>

      <div className="">
        Token Contract :
        <a
          className="underline"
          href={`https://goerli.etherscan.io/address/${TOKEN_ADDRESS}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {`https://goerli.etherscan.io/address/${TOKEN_ADDRESS}`}
        </a>
      </div>

      <div className="">
        NFT Contract :
        <a
          className="underline"
          href={`https://goerli.etherscan.io/address/${NFT_ADDRESS}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {`https://goerli.etherscan.io/address/${NFT_ADDRESS}`}
        </a>
      </div>

      <div>
        tool
      </div>
      <ul>
        <li>git</li>
        <li>ide</li>
        <li>npm</li>
      </ul>

      <div>
        page
      </div>
      <div>
        1 simple contract interaction
      </div>
      <div>
        2 simple mint token and displa token
      </div>
      <div>
        3 simple mint nft and display nft
      </div>

      <div>
        รู้ว่าจะทำอะไร , รู้ chain , address อะไร
      </div>

    </div>
  );
};

export default Home;
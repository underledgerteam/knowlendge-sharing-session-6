import { FC } from "react";
import { SIMPLE_BANK_ADRESS, TOKEN_ADDRESS, NFT_ADDRESS } from "src/utils/constants";

const Home: FC = () => {
  return (
    <div className="h-full p-10 bg-slate-700 text-2xl text-white">

      <div className="p-2">
        <p>Workshop repo</p>
        <a
          className="underline break-all"
          href="https://github.com/underledgerteam/knowlendge-sharing-session-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/underledgerteam/knowlendge-sharing-session-6
        </a>
      </div>

      <div className="p-2">
        <p>GoerliETH Faucet</p>
        <a
          className="underline break-all"
          href="https://goerlifaucet.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://goerlifaucet.com/
        </a>
      </div>

      <div className="p-2">
        <p>Bank Contract</p>
        <a
          className="underline break-all"
          href={`https://goerli.etherscan.io/address/${SIMPLE_BANK_ADRESS}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {`https://goerli.etherscan.io/address/${SIMPLE_BANK_ADRESS}`}
        </a>
      </div>

      <div className="p-2">
        <p>Token Contract</p>
        <a
          className="underline break-all"
          href={`https://goerli.etherscan.io/address/${TOKEN_ADDRESS}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {`https://goerli.etherscan.io/address/${TOKEN_ADDRESS}`}
        </a>
      </div>

      <div className="p-2">
        <p>NFT Contract</p>
        <a
          className="underline break-all"
          href={`https://goerli.etherscan.io/address/${NFT_ADDRESS}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {`https://goerli.etherscan.io/address/${NFT_ADDRESS}`}
        </a>
      </div>

    </div>
  );
};

export default Home;
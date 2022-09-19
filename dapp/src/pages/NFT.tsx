import { FC, useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import dayjs from "dayjs";

import { Web3Context } from "src/contexts/web3.context";
import MyButton from "src/components/MyButton";
import NftImage from "src/components/NftImage";
import { NFT_ADDRESS, NFT_ABI } from "src/utils/constants";

interface NftImageInterface {
  name: string;
  imageUrl: string;
  description: string;
  dna: string;
  edition: string;
  date: string;
}

const { ethereum } = window;

const NFT: FC = () => {
  // #1
  // const { walletAddress, walletBalance, getWalletBalance } = useContext(Web3Context);
  // const [cost, setCost] = useState("");
  // const [mintQty, setMintQty] = useState("");
  // const [maxMintQty, setMaxMintQty] = useState("");
  // const [totalSupply, setTotalSupply] = useState("");
  // const [maxSupply, setMaxSupply] = useState("");
  // const [nftList, setNftList] = useState<NftImageInterface[]>([]);

  // #1
  // const initContract = () => {
  //   const provider = new ethers.providers.Web3Provider(ethereum);
  //   const signer = provider.getSigner();
  //   const nftContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, signer);
  //   return nftContract;
  // };

  // #2 
  /* 
    Ask about ipfs 
    We could use IPFS, a decentralized protocol and peer-to-peer network 
    for storing and sharing data in a distributed file system. 
    As this protocol is DECENTRALIZED and FREE, it is our best option!
    ref : alchemy doc
  */
  // const getCost = async () => {
  //   const contract = initContract();
  //   const result = await contract.cost();
  //   // console.log('getCost', ethers.utils.formatEther(result));
  //   setCost(ethers.utils.formatEther(result));
  // };
  // const getMaxMintAmount = async () => {
  //   const contract = initContract();
  //   const result = await contract.maxMintAmount();
  //   // console.log('getMaxMintAmount', ethers.utils.formatUnits(result, 'wei'));
  //   setMaxMintQty(ethers.utils.formatUnits(result, 'wei'));
  // };
  // const getTotalSupply = async () => {
  //   const contract = initContract();
  //   const result = await contract.totalSupply();
  //   // console.log('getTotalSupply', ethers.utils.formatUnits(result, 'wei'));
  //   setTotalSupply(ethers.utils.formatUnits(result, 'wei'));
  // };
  // const getMaxSupply = async () => {
  //   const contract = initContract();
  //   const result = await contract.maxSupply();
  //   // console.log('getMaxSupply', ethers.utils.formatUnits(result, 'wei'));
  //   setMaxSupply(ethers.utils.formatUnits(result, 'wei'));
  // };
  // // start nft section
  // const getTokenUri = async (tokenId: number) => {
  //   const contract = initContract();
  //   const tokenUri = await contract.tokenURI(tokenId);
  //   // console.log('getTokenUri', tokenUri);
  //   return replaceUriToHttps(tokenUri);
  // };
  // const getNftMetaData = async (nftUrl: any) => {
  //   const result = await fetch(nftUrl);
  //   const nftMetaData = await result.json();
  //   return {
  //     ...nftMetaData,
  //     imageUrl: replaceUriToHttps(nftMetaData.image),
  //     date: dayjs(nftMetaData.date).format("DD/MM/YYYY"),
  //   };
  // };
  // const getNftListByAddress = async () => {
  //   const contract = initContract();
  //   const nftIdArray = await contract.walletOfOwner(walletAddress);
  //   // console.log('getNftListByAddress', nftIdArray);
  //   return nftIdArray;
  // };
  // const replaceUriToHttps = (uri: string) => {
  //   return uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
  // };
  // const handleGetNftList = async () => {
  //   let tokenUriPromises = [];
  //   let tokenMetaDataPromises = [];

  //   // 1st get all nft id
  //   const nftIdArray = await getNftListByAddress();

  //   // 2nd
  //   // prepare id for using getTokenUri()
  //   for (let id of nftIdArray) {
  //     tokenUriPromises.push(getTokenUri(id));
  //   }
  //   // parallel get all token uri 
  //   const tokenUriArray = await Promise.all(tokenUriPromises);
  //   // console.log('tokenUriArray', tokenUriArray);

  //   // 3rd
  //   // prepare data for using getNftMetaData()
  //   for (let tokenUri of tokenUriArray) {
  //     tokenMetaDataPromises.push(getNftMetaData(tokenUri));
  //   }
  //   // parallel get all token meta data
  //   const tokenMetaDataArray = await Promise.all(tokenMetaDataPromises);
  //   console.log('tokenMetaDataArray', tokenMetaDataArray);
  //   setNftList(tokenMetaDataArray);
  // };
  // end #2 nft section

  // #4 function mint nft
  // show hack
  // const handleMint = async () => {
  //   if (parseInt(mintQty) > parseInt(maxMintQty)) {
  //     alert(`Max mint per mint is ${maxMintQty}`);
  //     return true;
  //   }
  //   const mintPrice = (parseFloat(cost) * parseInt(mintQty)).toString();
  //   const tx = {
  //     value: ethers.utils.parseEther(mintPrice)
  //   };
  //   const contract = initContract();
  //   const result = await contract.mint(mintQty, tx);
  //   console.log('handleMint', result);
  //   // case hack
  //   // const contract = initContract();
  //   // const result = await contract.mint(mintQty);
  // };

  // #3 
  // const handleRefresh = async () => {
  //   await Promise.all([
  //     getWalletBalance(),
  //     getMaxSupply(),
  //     handleGetNftList(),
  //   ]);
  // };

  // #2
  // useEffect(() => {
  //   const init = async () => {
  //     if (walletAddress) {
  //       await Promise.all([
  //         getCost(),
  //         getMaxMintAmount(),
  //         getTotalSupply(),
  //         getMaxSupply(),
  //         handleGetNftList(),
  //       ]);
  //     }
  //   };
  //   init();
  // }, [walletAddress]);

  return (
    <div className="h-full p-4 text-center bg-slate-700">

      {/* #3 */}
      <div className="w-10/12 md:w-9/12 mx-auto my-4 p-4 border border-white bg-gray-100 text-2xl">
        <p className="text-2xl">info</p>
        {/* <div>
          address : {`${walletAddress || `...`}`}
        </div>
        <div>
          wallet balance : {`${walletBalance || 0} ETH`}
        </div>
        <div>
          Cost {`${cost}`}
        </div>
        <div>
          Minted NFT {`${totalSupply} / ${maxSupply}`}
        </div>
        <MyButton id="refreshButton" name="refreshButton" className="mt-4" text="REFRESH" onClick={handleRefresh} /> */}
      </div>

      {/* #4 */}
      <div className="w-10/12 md:w-9/12 mx-auto my-4 p-4 border border-white bg-gray-100 text-2xl">
        <div>
          Mint NFT
        </div>
        {/* <div>
          Max mint {`${maxMintQty}`}
        </div>
        <input
          name="mintQty"
          className="w-6/12 mt-4 p-2 outline-none border text-lg white-glassmorphism rounded-sm"
          type="number"
          value={mintQty}
          placeholder="input mint quantity"
          onChange={e => setMintQty(e.target.value)}
        />
        <MyButton id="mintButton" name="mintButton" className="mx-2" text="MINT" onClick={handleMint} /> */}
      </div>

      {/* #3 */}
      <div className="w-10/12 md:w-9/12 mx-auto my-4 p-4 border border-white bg-gray-100 text-2xl">
        <div>
          NFT image
        </div>
        {/* <div className="mt-4 grid grid-cols-4 gap-4 justify-items-center content-around">
          {nftList.map((nft) => (
            <NftImage
              key={nft.name}
              name={nft.name}
              imageUrl={nft.imageUrl}
              description={nft.description}
              dna={nft.dna}
              edition={nft.edition}
              date={nft.date}
            />
          ))}
        </div> */}
      </div>

    </div>
  );
};
export default NFT;
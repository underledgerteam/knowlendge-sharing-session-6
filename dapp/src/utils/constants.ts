import bankAbi from "src/contracts/bankAbi.json";
import merc20Abi from "src/contracts/merc20Abi.json";
import merc721Abi from "src/contracts/merc721Abi.json";

export const SIMPLE_BANK_ADRESS: string = process.env.REACT_APP_BANK_ADDRESS || "";
export const SIMPLE_BANK_ABI: Object[] = bankAbi;

export const TOKEN_ADDRESS: string = process.env.REACT_APP_TOKEN_ADDRESS || "";
export const TOKEN_ABI: Object[] = merc20Abi;

export const NFT_ADDRESS: string = process.env.REACT_APP_NFT_ADDRESS || "";
export const NFT_ABI: Object[] = merc721Abi;
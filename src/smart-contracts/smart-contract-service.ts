import contractAbi from "../smart-contracts/abi.json";
import { Contract, ethers } from "ethers";
import { WalletState } from "@web3-onboard/core";

export class SmartContractService {
    private static Contract: Contract;

    static async load(wallet: WalletState | null, window: any): Promise<{ readContract: Contract }> {
        if (this.Contract) {
            return { readContract: this.Contract };
        }
        if (!wallet) {
            throw new Error("Wallet is not defined");
        }
        if (!window.ethereum) {
            throw new Error("Ethereum is not defined wtf!");
        }

        const privateKey = process.env.REACT_APP_PRIVATE_KEY as string;
        const smartContractAddress = process.env.REACT_APP_SMART_CONTRACT_ADDRESS as string;
        const abi = contractAbi.abi;

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = new ethers.Wallet(privateKey, provider);
        this.Contract = new ethers.Contract(smartContractAddress, abi, signer);
        return { readContract: this.Contract };
    }

}
import contractAbi from "../smart-contracts/abi.json";
import { Contract, ethers } from "ethers";
import { WalletState } from "@web3-onboard/core";

export class SmartContractService {
    private static Contract: Contract;

    static async load(wallet: WalletState | null, window: any): Promise<{ contract: Contract }> {
        if (this.Contract) {
            return { contract: this.Contract };
        }
        if (!wallet) {
            throw new Error("Wallet is not defined");
        }
        // if (!window.ethereum) {
        //     throw new Error("Ethereum is not defined wtf!");
        // }

        const privateKey = process.env.REACT_APP_PRIVATE_KEY as string;
        const smartContractAddress = process.env.REACT_APP_SMART_CONTRACT_ADDRESS as string;
        const abi = contractAbi.abi;

        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const signer = new ethers.Wallet(privateKey, provider);

        const provider = new ethers.providers.Web3Provider(wallet.provider, "any");
        const signer = provider.getSigner();

        this.Contract = new ethers.Contract(smartContractAddress, abi, signer);
        return { contract: this.Contract };
    }

    static listenToEvent(contract: Contract, eventName: string, callback: (...parameters: any) => void): void {
        contract.on(eventName, callback);
    }
}
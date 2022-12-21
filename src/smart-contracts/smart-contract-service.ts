import contractAbi from "../smart-contracts/abi.json";
import { Contract, ethers } from "ethers";
import { WalletState } from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";

// interface Wallet {
//     wallets: WalletState[];
//     addWallet: (wallet: WalletState) => void;
//     removeWallet: (wallet: WalletState) => void;
//     deleteWallets: () => void;
// }

// export const useWalletStore = create<Wallet>()(
//     devtools(
//         persist(
//             (set) => {
//                 return {
//                     wallets: [],
//                     addWallet: (wallet: WalletState) => set((state) => ({ wallets: [...state.wallets, wallet] })),
//                     removeWallet: (wallet: WalletState) => set((state) => ({ wallets: state.wallets.filter((w) => w !== wallet) })),
//                     deleteWallets: () => set(() => ({ wallets: [] }))
//                 };
//             },
//             {
//                 name: "wallets"
//             }
//         )
//     ));

// const MAINNET_RPC_URL = "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
// const MAINNET_RPC_URL = `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`;
const MAINNET_RPC_URL = `http://localhost:8545`;


export class SmartContractService {
    private static Contract: Contract;

    static initOnBoard(): void {
        const injected = injectedModule();
        init({
            wallets: [injected],
            chains: [
                {
                    id: "0x1",
                    token: "ETH",
                    label: "Ethereum Mainnet",
                    rpcUrl: MAINNET_RPC_URL
                }
            ]
        });
    }

    static async load(wallet: WalletState | null): Promise<{ contract: Contract }> {
        if (this.Contract) {
            return { contract: this.Contract };
        }
        if (!wallet) {
            throw new Error("Wallet is not defined");
        }

        // const privateKey = process.env.REACT_APP_PRIVATE_KEY as string;
        const smartContractAddress = process.env.REACT_APP_SMART_CONTRACT_ADDRESS as string;
        const abi = contractAbi.abi;

        const provider = new ethers.providers.Web3Provider(wallet.provider, "any");
        const signer = provider.getSigner();

        this.Contract = new ethers.Contract(smartContractAddress, abi, signer);
        return { contract: this.Contract };
    }

    static listenToEvent(contract: Contract, eventName: string, callback: (...parameters: any) => void): void {
        contract.on(eventName, callback);
    }
}

import contractAbi from "../smart-contracts/abi.json";
import { Contract, ethers } from "ethers";
import { WalletState } from "@web3-onboard/core";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Wallet {
    wallets: WalletState[];
    addWallet: (wallet: WalletState) => void;
    removeWallet: (wallet: WalletState) => void;
    deleteWallets: () => void;
}

export class SmartContractService {
    static useWalletStore = create<Wallet>()(
        devtools(
            persist(
                (set) => {
                    return {
                        wallets: [],
                        addWallet: (wallet: WalletState) => set((state) => ({ wallets: [...state.wallets, wallet] })),
                        removeWallet: (wallet: WalletState) => set((state) => ({ wallets: state.wallets.filter((w) => w !== wallet) })),
                        deleteWallets: () => set(() => ({ wallets: [] }))
                    };
                },
                {
                    name: "wallets"
                }
            )
        ));
    private static Contract: Contract;

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

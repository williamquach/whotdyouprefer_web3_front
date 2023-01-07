import voteContractAbi from "./vote_abi.json";
import donationContractAbi from "./donation_abi.json";
import { Contract, ethers } from "ethers";
import { ConnectOptions, WalletState } from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";


// const MAINNET_RPC_URL = "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
// const MAINNET_RPC_URL = `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`;
const MAINNET_RPC_URL = `http://localhost:8545`;


export class SmartContractService {
    private static VoteContract: Contract;
    private static DonationContract: Contract;

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
            ],
            accountCenter: {
                desktop: {
                    position: "bottomLeft",
                    enabled: true
                },
                mobile: {
                    position: "bottomLeft",
                    enabled: true
                }
            },
            notify: {
                desktop: {
                    enabled: true,
                    transactionHandler: transaction => {
                        console.log("Transaction handler");
                        console.log({ transaction });
                        if (transaction.eventCode === "txPool") {
                            return {
                                type: "success",
                                message: "Your transaction from #1 DApp is in the mempool"
                            };
                        }
                    },
                    position: "bottomLeft"
                },
                mobile: {
                    enabled: true,
                    transactionHandler: transaction => {
                        console.log({ transaction });
                        if (transaction.eventCode === "txPool") {
                            return {
                                type: "success",
                                message: "Your transaction from #1 DApp is in the mempool"
                            };
                        }
                    },
                    position: "topRight"
                }
            }
        });
    }

    static getConnectedWalletsFromStorage(): any[] {
        return JSON.parse(
            window.localStorage.getItem("connectedWallets") || "[]"
        );
    }

    static setConnectedWalletsInStorage(connectedWallets: WalletState[]): void {
        if (connectedWallets.length > 0) {
            window.localStorage.setItem(
                "connectedWallets",
                JSON.stringify(connectedWallets.map(
                    (wallet) => wallet.label
                ))
            );
        }
    }

    static removeCurrentWalletFromConnectedWallets(wallet: WalletState | null): void {
        if (wallet) {
            const connectedWallets = JSON.parse(window.localStorage.getItem("connectedWallets") || "[]");
            const newConnectedWallets = connectedWallets.filter((connectedWallet: string) => connectedWallet !== wallet.label);
            window.localStorage.setItem("connectedWallets", JSON.stringify(newConnectedWallets));
        }
    }

    static async connectWalletFromStorage(previouslyConnectedWalletLabels: any[], connect: (options?: ConnectOptions) => Promise<WalletState[]>) {
        const walletConnected = await connect({
            autoSelect: previouslyConnectedWalletLabels[0]
        });
        if (walletConnected) {
            return previouslyConnectedWalletLabels[0];
        }
    }


    static loadVoteContract(wallet: WalletState | null): { voteContract: Contract } {
        if (this.VoteContract) {
            return { voteContract: this.VoteContract };
        }
        if (!wallet) {
            throw new Error("Wallet is not defined");
        }

        // const privateKey = process.env.REACT_APP_PRIVATE_KEY as string;
        const smartContractAddress = process.env.REACT_APP_VOTE_SMART_CONTRACT_ADDRESS as string;
        const abi = voteContractAbi.abi;

        const provider = new ethers.providers.Web3Provider(wallet.provider, "any");
        const signer = provider.getSigner();

        this.VoteContract = new ethers.Contract(smartContractAddress, abi, signer);
        return { voteContract: this.VoteContract };
    }

    static loadDonationContract(wallet: WalletState | null): { donationContract: Contract } {
        if (this.DonationContract) {
            return { donationContract: this.DonationContract };
        }
        if (!wallet) {
            throw new Error("Wallet is not defined");
        }

        const smartContractAddress = process.env.REACT_APP_DONATION_SMART_CONTRACT_ADDRESS as string;
        const abi = donationContractAbi.abi;

        const provider = new ethers.providers.Web3Provider(wallet.provider, "any");
        const signer = provider.getSigner();

        this.DonationContract = new ethers.Contract(smartContractAddress, abi, signer);
        return { donationContract: this.DonationContract };
    }

    static listenToEvent(contract: Contract, eventName: string, callback: (...parameters: any) => void): void {
        contract.on(eventName, callback);
    }
}

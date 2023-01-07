import React from "react";
import { Button, Center, Container } from "@mantine/core";
import { useConnectWallet } from "@web3-onboard/react";
import { WalletState } from "@web3-onboard/core";
import { SmartContractService } from "../../../smart-contracts/smart-contract-service";

function Account() {
    const [{ wallet }, , disconnect] = useConnectWallet();

    const disconnectCurrentWallet = async (wallet: WalletState) => {
        await disconnect(wallet);
        SmartContractService.removeCurrentWalletFromConnectedWallets(wallet);
    };

    return (
        <>
            <Container>
                {wallet ? (
                    <>
                        <Center>
                            <h1 className="Session-Cards-Title">Compte</h1>
                        </Center>
                        <br />
                        <Center>
                            <strong>Provider : </strong>
                        </Center>
                        <Center>
                            <p>{wallet?.label}</p>
                        </Center>
                        <Center>
                            <strong>Adresse du compte : </strong>
                        </Center>
                        <Center>
                            <p>{wallet.accounts[0].address}</p>
                        </Center>
                        {wallet?.accounts[0].balance && (
                            <>
                                <Center>
                                    <strong>Balance : </strong>
                                </Center>
                                <Center>
                                    <p>{wallet?.accounts[0].balance?.ETH} ETH</p>
                                </Center>
                            </>
                        )}
                        <Center>
                            <Button color={"red"} onClick={() => disconnectCurrentWallet(wallet)}>Se
                                déconnecter</Button>
                        </Center>
                    </>
                ) : (
                    <>
                        <Center>
                            <h1 className="Session-Cards-Title">Non connecté</h1>
                        </Center>
                    </>
                )}
            </Container>
        </>
    );
}

export default Account;

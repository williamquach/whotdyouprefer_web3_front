import React from "react";
import { Button, Card, Center } from "@mantine/core";
import { useConnectWallet } from "@web3-onboard/react";
import walletImage from "../../../assets/img/wallet.png";

function Connect() {
    const [{}, connect] = useConnectWallet();

    return (
        <Center style={{ height: "100vh" }}>
            <Card className="App-Card" shadow="sm" p="lg" radius="md" withBorder>
                <Center>
                    <img src={walletImage} className="Wallet-Provider-Image" alt="logo" />
                </Center>
                <Button color={"dark"} size={"xl"} onClick={() => {
                    connect();
                }
                }>Connect wallet</Button>
            </Card>
        </Center>
    );
}

export default Connect;

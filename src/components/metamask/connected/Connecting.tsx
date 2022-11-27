import React from "react";
import { Card, Center } from "@mantine/core";
import { redirectByWalletConnectionStatus } from "../../../utils/redirect.util";
import { useMetaMask } from "metamask-react";
import metamaskImage from "../../../assets/img/metamask.png";

function Connecting() {
    const { status } = useMetaMask();
    redirectByWalletConnectionStatus(status, window.location.pathname);
    return (
        <Center>
            <Card className="App-Card" shadow="sm" p="lg" radius="md" withBorder>
                <Center>
                    <img src={metamaskImage} className="Wallet-Provider-Image" alt="logo" />
                </Center>
                <Center>
                    <strong>Connecting to Metamask...</strong>
                </Center>
            </Card>
        </Center>
    );
}

export default Connecting;

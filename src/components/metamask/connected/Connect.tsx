import React from "react";
import { Button, Card, Center } from "@mantine/core";
import metamaskImage from "../../../assets/img/metamask.png";
import { useMetaMask } from "metamask-react";
import { redirectByWalletConnectionStatus } from "../../../utils/redirect.util";

function Connect(props: { connect: () => Promise<string[] | null> }) {
    const { status } = useMetaMask();
    redirectByWalletConnectionStatus(status, window.location.pathname);
    return (
        <Center>
            <Card className="App-Card" shadow="sm" p="lg" radius="md" withBorder>
                <Center>
                    <img src={metamaskImage} className="Wallet-Provider-Image" alt="logo" />
                </Center>
                <Button size={"xl"} onClick={props.connect}>Connect to MetaMask</Button>
            </Card>
        </Center>
    );
}

export default Connect;

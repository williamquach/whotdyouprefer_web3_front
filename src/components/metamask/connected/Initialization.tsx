import React from "react";
import { Card, Center } from "@mantine/core";
import metamaskImage from "../../../assets/img/metamask.png";

function Initialization() {
    return (
        <Center style={{ height: "100vh" }}>
            <Card className="App-Card" shadow="sm" p="lg" radius="md" withBorder>
                <Center>
                    <img src={metamaskImage} className="Wallet-Provider-Image" alt="logo" />
                </Center>
                <Center>
                    <strong>Synchronisation with Metamask ongoing...</strong>
                </Center>
            </Card>
        </Center>
    );
}

export default Initialization;

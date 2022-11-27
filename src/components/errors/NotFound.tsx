import React from "react";
import { Card, Center } from "@mantine/core";

function NotFound() {
    // const { status } = useMetaMask();
    // redirectByWalletConnectionStatus(status, window.location.pathname);
    return (
        <Card className="App-Card" shadow="sm" p="lg" radius="md" withBorder>
            <Center>
                <strong style={{ fontSize: 80 }}>404</strong>
            </Center>
            <Center>
                <h1>Page not found 👀</h1>
            </Center>
        </Card>
    );
}

export default NotFound;

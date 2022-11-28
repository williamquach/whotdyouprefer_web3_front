import React from "react";
import { Card, Center } from "@mantine/core";
import { Link } from "react-router-dom";

function NotFound() {
    // const { status } = useMetaMask();
    // redirectByWalletConnectionStatus(status, window.location.pathname);
    return (
        <Center style={{ height: "100vh" }}>
            <Card className="App-Card" shadow="sm" p="lg" radius="md" withBorder>
                <Center>
                    <strong style={{ fontSize: 80 }}>404</strong>
                </Center>
                <Center>
                    <h1>Page not found 👀</h1>
                </Center>
                <Link color={"red"} to="/">Go back to home</Link>
            </Card>
        </Center>
    );
}

export default NotFound;

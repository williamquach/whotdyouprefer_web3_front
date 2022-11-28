import React from "react";
import { Button, Card, Center, Title } from "@mantine/core";
import logo from "../../logo.svg";
import { navigateTo } from "../../utils/redirect.util";
import { useNavigate } from "react-router-dom";

function Welcome() {
    const navigate = useNavigate();
    const goToSessions = () => {
        navigateTo("/", navigate);
    };
    return (
        <Center style={{ height: "100vh" }}>
            <Card className="App-Card" shadow="sm" p="lg" radius="md" withBorder>
                <img src={logo} className="App-logo" alt="logo" />
                <Title className="App-welcome" order={1}>Bienvenue 👏</Title>
                <Button color="yellow" size="xl">
                    <a
                        className="App-Button-Link"
                        href="/"
                        onClick={goToSessions}
                    >
            Voir les sessions de vote ouvertes
                    </a>
                </Button>
            </Card>
        </Center>
    );
}

export default Welcome;

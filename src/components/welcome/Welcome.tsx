import React from "react";
import { useMetaMask } from "metamask-react";
import { Button, Card, Center, Title } from "@mantine/core";
import logo from "../../logo.svg";
import { navigateTo, redirectByWalletConnectionStatus } from "../../utils/redirect.util";

function Welcome() {
    const { status } = useMetaMask();
    redirectByWalletConnectionStatus(status, window.location.pathname);

    const goToSessions = () => {
        // const navigate = useNavigate();
        // navigate("/home", { replace: true });
        navigateTo("/sessions/opened");
    };
    return (
        <Center>
            <Card className="App-Card" shadow="sm" p="lg" radius="md" withBorder>
                <img src={logo} className="App-logo" alt="logo" />
                <Title className="App-welcome" order={1}>Bienvenue 👏</Title>
                {/*<Button onClick={goToSessions}>Voir les sessions de vote ouvertes</Button>*/}
                <Button color="yellow" size="xl" onClick={goToSessions}>
                    Accéder aux sessions de vote
                </Button>
            </Card>
        </Center>
    );
}

export default Welcome;

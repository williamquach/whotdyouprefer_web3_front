import React from "react";
import { Center, Container } from "@mantine/core";
import { useConnectedMetaMask } from "metamask-react";

function Account() {
    const { account, chainId, status } = useConnectedMetaMask();
    return (
        <>
            <Container>
                <Center>
                    <h1 className="Session-Cards-Title">Compte</h1>
                </Center>
                <br />
                <Center>
                    <strong>Adresse du compte : </strong>
                </Center>
                <Center>
                    <p>{account}</p>
                </Center>
                <Center>
                    <strong>Chain ID : </strong>
                </Center>
                <Center>
                    <p>{chainId}</p>
                </Center>
                <Center>
                    <strong>Status : </strong>
                </Center>
                <Center>
                    <p>{status}</p>
                </Center>
            </Container>
        </>
    );
}

export default Account;

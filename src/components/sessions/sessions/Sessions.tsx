import React, { useEffect, useState } from "react";
import { Center, Col, Container, Grid } from "@mantine/core";
import SessionCard from "./SessionCard";
import NoSessions from "./NoSessions";
import "./Sessions.css";
import { orderSessionsFromNewestToOldest, Session } from "../../../models/sessions/session.model";
import { useConnectWallet } from "@web3-onboard/react";
import { SmartContractService } from "../../../smart-contracts/smart-contract-service";
import { SessionService } from "../../../services/session.service";

function Sessions() {
    const [{ wallet }] = useConnectWallet();
    const [sessions, setSessions] = useState<Session[]>([]);

    const getSessions = async () => {
        if (wallet) {
            const { contract } = await SmartContractService.load(wallet, window);
            const foundOpenedSessions = await SessionService.getOpenedSessions(contract);
            setSessions(foundOpenedSessions);
        }
    };

    useEffect(() => {
        getSessions()
            .then(() => console.log("Opened sessions loaded"))
            .catch((error) => console.error("Error while loading opened sessions", error));
    }, [wallet]);

    return (
        <>
            <Container>
                <Center>
                    <h1 className="Session-Cards-Title">Sessions de vote ouvertes</h1>
                </Center>
                {sessions.length === 0 && (
                    <NoSessions />
                )}
                {sessions.length > 0 && (
                    <Grid className="Session-Cards" gutter="lg">
                        {orderSessionsFromNewestToOldest(sessions).map((session) => (
                            <Col md={6} lg={6} key={session.sessionId}>
                                <SessionCard session={session} />
                            </Col>
                        ))}
                    </Grid>
                )}
            </Container>
        </>
    );
}

export default Sessions;

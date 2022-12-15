import React, { useEffect, useState } from "react";
import { Center, Col, Container, Grid } from "@mantine/core";
import SessionInHistory from "./SessionInHistory";
import NoSessions from "../sessions/NoSessions";
import "./SessionHistory.css";
import { orderSessionsFromNewestToOldest, Session } from "../../../models/sessions/session.model";
import { useConnectWallet } from "@web3-onboard/react";
import { SmartContractService } from "../../../smart-contracts/smart-contract-service";
import { SessionService } from "../sessions/SessionService";

function SessionHistory() {
    // const sessions: Session[] = [
    //     {
    //         sessionId: 1,
    //         label: "La meilleure pizza",
    //         description: "Votez pour la meilleure pizza",
    //         expiresAt: new Date("2018-06-06T00:00:00.000Z")
    //     },
    //     {
    //         sessionId: 4,
    //         label: "Délégués 5AL1 - ESGI",
    //         description: "Qui sera le meilleur délégué de la promo 5AL1 ?",
    //         expiresAt: new Date("2012-06-03T00:00:00.000Z")
    //     }
    // ];

    const [{ wallet }] = useConnectWallet();
    const [closedSessions, setClosedSessions] = useState<Session[]>([]);

    const getClosedSessions = async () => {
        if (wallet) {
            const { readContract } = await SmartContractService.load(wallet, window);
            const foundClosedSessions = await SessionService.getClosedSessions(readContract);
            setClosedSessions(foundClosedSessions);
        }
    };

    useEffect(() => {
        getClosedSessions()
            .then(() => console.log("Closed sessions loaded"))
            .catch((error) => console.error("Error while loading closed sessions", error));
    }, [wallet]);

    return (
        <>
            <Container>
                <Center>
                    <h1 className="Session-Cards-Title">Historique de vote</h1>
                </Center>
                {closedSessions.length === 0 && (
                    <NoSessions />
                )}
                {closedSessions.length > 0 && (
                    <Grid className="Session-Cards" gutter="lg">
                        {orderSessionsFromNewestToOldest(closedSessions).map((session) => (
                            <Col md={6} lg={6}>
                                <SessionInHistory session={session} />
                            </Col>
                        ))}
                    </Grid>
                )}
            </Container>
        </>
    );
}

export default SessionHistory;

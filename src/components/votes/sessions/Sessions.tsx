import React, { useEffect, useState } from "react";
import { Center, Col, Container, Grid } from "@mantine/core";
import SessionCard from "./SessionCard";
import NoSessions from "./NoSessions";
import "./Sessions.css";
import { orderSessionsFromNewestToOldest, Session } from "../../../models/sessions/session.model";
import { useConnectWallet } from "@web3-onboard/react";
import { SmartContractService } from "../../../smart-contracts/smart-contract-service";
import { SessionService } from "./SessionService";

function Sessions() {
    // const sessions: Session[] = [
    //     {
    //         sessionId: 1,
    //         label: "The best session ever",
    //         description: "This is the best session ever",
    //         expiresAt: new Date("2021-06-06T00:00:00.000Z")
    //     },
    //     {
    //         sessionId: 2,
    //         label: "Qu'est ce que je fais aujoud'hui",
    //         description: "Je ne sais pas ce que je fais aujoud'hui, aidez moi à choisir",
    //         expiresAt: new Date("2021-06-01T00:00:00.000Z")
    //     },
    //     {
    //         sessionId: 3,
    //         label: "J'achète un nouveau téléphone",
    //         description: "Dites moi quel téléphone je dois acheter",
    //         expiresAt: new Date("2021-06-02T00:00:00.000Z")
    //     },
    //     {
    //         sessionId: 4,
    //         label: "Meilleur sneakers",
    //         description: "Quelle sneakers est la meilleure d'après vous ?",
    //         expiresAt: new Date("2012-06-03T00:00:00.000Z")
    //     }
    // ];

    const [{ wallet }] = useConnectWallet();
    const [sessions, setSessions] = useState<Session[]>([]);

    const getSessions = async () => {
        if (wallet) {
            const { readContract } = await SmartContractService.load(wallet, window);
            const foundOpenedSessions = await SessionService.getOpenedSessions(readContract);
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
                            <Col md={6} lg={6}>
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

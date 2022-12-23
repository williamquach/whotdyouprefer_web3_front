import React, { useEffect, useState } from "react";
import { Center, Col, Container, Grid, LoadingOverlay } from "@mantine/core";
import SessionCard from "./SessionCard";
import NoSessions from "./NoSessions";
import "./Sessions.css";
import { orderSessionsFromNewestToOldest, Session } from "../../../models/sessions/session.model";
import { useConnectWallet } from "@web3-onboard/react";
import { SmartContractService } from "../../../smart-contracts/smart-contract-service";
import { SessionService } from "../../../services/session.service";

function Sessions() {
    const [{ wallet }] = useConnectWallet();
    const [sessions, setSessions] = useState<Session[]>();

    const getSessions = async () => {
        if (wallet) {
            const { voteContract } = SmartContractService.loadVoteContract(wallet);
            const foundOpenedSessions = await SessionService.getOpenedSessions(voteContract);
            setSessions(foundOpenedSessions);
        }
    };

    useEffect(() => {
        getSessions()
            .catch((error) => console.error("Error while loading opened sessions", error));
    }, [wallet]);

    return (
        <>
            <Container>
                {!sessions && (
                    <>
                        <Center>
                            <h3 className="Session-Cards-Loading">Chargement des sessions de vote...</h3>
                        </Center>
                        <LoadingOverlay
                            loaderProps={{ size: "lg", color: "pink", variant: "dots" }}
                            overlayOpacity={0.3}
                            overlayColor="#c5c5c5"
                            visible
                        />
                    </>
                )}
                <Center>
                    <h1 className="Session-Cards-Title">Sessions de vote ouvertes</h1>
                </Center>
                {sessions && sessions.length === 0 && (
                    <NoSessions />
                )}
                {sessions && sessions.length > 0 && (
                    <Grid className="Session-Cards" gutter="lg">
                        {orderSessionsFromNewestToOldest(sessions).map((session) => (
                            <Col md={6} lg={6} key={session.sessionId}>
                                <SessionCard session={session} userHasVoted={session.hasVoted} />
                            </Col>
                        ))}
                    </Grid>
                )}
            </Container>
        </>
    );
}

export default Sessions;

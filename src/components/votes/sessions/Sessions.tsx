import React from "react";
import { Center, Col, Container, Grid } from "@mantine/core";
import SessionCard from "./SessionCard";
import NoSessions from "./NoSessions";

function Sessions() {
    // const { status } = useMetaMask();
    // redirectByWalletConnectionStatus(status, window.location.pathname);
    const sessions: { sessionId: number }[] = [
        {
            sessionId: 1
        },
        {
            sessionId: 2
        },
        {
            sessionId: 3
        },
        {
            sessionId: 4
        },
        {
            sessionId: 5
        }
    ];
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
                        {sessions.map((session) => (
                            <Col md={6} lg={6}>
                                <SessionCard sessionId={session.sessionId} />
                            </Col>
                        ))}
                    </Grid>
                )}
            </Container>
        </>
    );
}

export default Sessions;

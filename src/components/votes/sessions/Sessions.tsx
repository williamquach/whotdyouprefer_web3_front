import React from "react";
import { Center, Col, Container, Grid } from "@mantine/core";
import SessionCard from "./SessionCard";
import NoSessions from "./NoSessions";
import "./Sessions.css";
import { orderSessionsFromNewestToOldest, Session } from "../../../models/sessions/session.model";

function Sessions() {
    const sessions: Session[] = [
        {
            sessionId: 1,
            label: "The best session ever",
            description: "This is the best session ever",
            expiresAt: new Date("2021-06-06T00:00:00.000Z")
        },
        {
            sessionId: 2,
            label: "Qu'est ce que je fais aujoud'hui",
            description: "Je ne sais pas ce que je fais aujoud'hui, aidez moi à choisir",
            expiresAt: new Date("2021-06-01T00:00:00.000Z")
        },
        {
            sessionId: 3,
            label: "J'achète un nouveau téléphone",
            description: "Dites moi quel téléphone je dois acheter",
            expiresAt: new Date("2021-06-02T00:00:00.000Z")
        },
        {
            sessionId: 4,
            label: "Meilleur sneakers",
            description: "Quelle sneakers est la meilleure d'après vous ?",
            expiresAt: new Date("2012-06-03T00:00:00.000Z")
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

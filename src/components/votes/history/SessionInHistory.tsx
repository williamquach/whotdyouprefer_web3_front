import React from "react";
import { Card, CardSection, Center, Text } from "@mantine/core";
import "./SessionHistory.css";
import { Session } from "../../../models/sessions/session.model";

function SessionInHistory(props: { session: Session }) {
    const goToSessionClosedDetails = (session: Session) => {
        console.log("goToSessionClosedDetails : " + session);
    };
    return (
        <>
            <Card
                shadow="sm"
                p="xl"
                component="a"
                onClick={() => {
                    goToSessionClosedDetails(props.session);
                }}
                href={"/sessions/closed/" + props.session.sessionId}
            >
                <CardSection>
                    <Center className="Session-Name">
                        <h1>{props.session.label}</h1>
                    </Center>
                </CardSection>

                <Text weight={500} size="lg" mt="md">
                    {props.session.description}
                </Text>

                <Text mt="xs" color="dimmed" size="sm">
                    <p>Fermée : {props.session.expiresAt.toDateString()}</p>
                </Text>
            </Card>
        </>
    );
}

export default SessionInHistory;

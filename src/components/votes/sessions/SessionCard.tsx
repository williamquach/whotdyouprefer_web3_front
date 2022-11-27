import React from "react";
import { Card, CardSection, Center, Text } from "@mantine/core";
import "./Sessions.css";

function SessionCard(props: { sessionId: number }) {
    return (
        <>
            <Card
                shadow="sm"
                p="xl"
                component="a"
                href="/sessions/{props.sessionId}"
            >
                <CardSection>
                    <Center className="Session-Name">
                        <h1>Session {props.sessionId}</h1>
                    </Center>
                </CardSection>

                <Text weight={500} size="lg" mt="md">
                    You&apos;ve won a million dollars in cash!
                </Text>

                <Text mt="xs" color="dimmed" size="sm">
                    Please click anywhere on this card to claim your reward, this is not a fraud, trust us
                </Text>
            </Card>
        </>
    );
}

export default SessionCard;

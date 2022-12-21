import React from "react";
import { Card, CardSection, Center, Divider, Text } from "@mantine/core";
import "./SessionHistory.css";
import { Session } from "../../../models/sessions/session.model";
import { navigateTo } from "../../../utils/redirect.util";
import { useNavigate } from "react-router-dom";

function SessionInHistory(props: { session: Session }) {
    const navigate = useNavigate();

    return (
        <>
            <Card
                shadow="sm"
                p="xl"
                component="a"
                onClick={() => {
                    navigateTo("/sessions/closed/" + props.session.sessionId, navigate);
                }}
                href={"#"}
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
                {/*  Display if user has already voted */}
                {props.session.hasVoted && (
                    <>
                        <Divider my="sm" variant="solid" />
                        <Text mt="xs" color="dimmed" size="sm">
                            <strong><em>Vous avez participé à cette session ✅</em></strong>
                        </Text>
                    </>
                )}
            </Card>
        </>
    );
}

export default SessionInHistory;

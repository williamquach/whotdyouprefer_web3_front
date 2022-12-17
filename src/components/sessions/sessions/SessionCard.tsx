import React from "react";
import { Card, CardSection, Center, Text } from "@mantine/core";
import { Session } from "../../../models/sessions/session.model";
import { useNavigate } from "react-router-dom";
import { navigateTo } from "../../../utils/redirect.util";
import dayjs from "dayjs";

function SessionCard(props: { session: Session }) {
    const navigate = useNavigate();
    return (
        <>
            <Card
                shadow="sm"
                p="xl"
                component="a"
                href="#"
                onClick={() => {
                    navigateTo("/sessions/" + props.session.sessionId, navigate);
                }}
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
                    <p>Fermeture : {dayjs(props.session.expiresAt).format("LLLL")}</p>
                </Text>
            </Card>
        </>
    );
}

export default SessionCard;

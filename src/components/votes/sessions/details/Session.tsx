import React from "react";
import { Center, Container } from "@mantine/core";
import "./Session.css";

function Session(props: { sessionId: number }) {
    return (
        <>
            <Container>
                <Center>
                    <h1 className="Session-Cards-Title">Session {props.sessionId}</h1>
                </Center>
            </Container>
        </>
    );
}

export default Session;

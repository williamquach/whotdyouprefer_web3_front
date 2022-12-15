import React from "react";
import { Container } from "@mantine/core";
import "./SessionClosedHome.css";
import { AppHeader } from "../../../Home/header/AppHeader";
import { headerLinks } from "../../../Home/Home";
import { useParams } from "react-router-dom";
import { findClosedSessionById } from "./session.service";
import SessionClosedDetails from "./SessionClosedDetails";

function SessionClosedHome() {
    const sessionId = useParams().sessionId ?? "0";
    const session = findClosedSessionById(parseInt(sessionId));
    return (
        <>
            <AppHeader links={headerLinks} />
            <Container className="Main-Page-Container" size="lg">
                <SessionClosedDetails session={session} />
            </Container>
        </>
    );
}

export default SessionClosedHome;

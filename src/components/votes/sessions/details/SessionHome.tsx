import React from "react";
import { Container } from "@mantine/core";
import "./SessionHome.css";
import { AppHeader } from "../../../Home/header/AppHeader";
import { headerLinks } from "../../../Home/Home";
import SessionDetails from "./SessionDetails";
import { useParams } from "react-router-dom";
import { findSessionById } from "./session.service";

function SessionHome() {
    const sessionId = useParams().sessionId ?? "0";
    const session = findSessionById(parseInt(sessionId));
    return (
        <>
            <AppHeader links={headerLinks} />
            <Container className="Main-Page-Container" size="lg">
                <SessionDetails session={session} />
            </Container>
        </>
    );
}

export default SessionHome;

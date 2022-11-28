import React from "react";
import { Container } from "@mantine/core";
import "./SessionHome.css";
import { AppHeader } from "../../../Home/header/AppHeader";
import { headerLinks } from "../../../Home/Home";
import Session from "./Session";
import { useParams } from "react-router-dom";

function SessionHome() {
    const sessionId = useParams().sessionId ?? "0";
    console.log("SessionHome sessionId: " + sessionId);
    return (
        <>
            <AppHeader links={headerLinks} />
            <Container className="Main-Page-Container" size="lg">
                <Session sessionId={parseInt(sessionId)} />
            </Container>
        </>
    );
}

export default SessionHome;

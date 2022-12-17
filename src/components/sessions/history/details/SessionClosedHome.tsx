import React from "react";
import { Container } from "@mantine/core";
import "./SessionClosedHome.css";
import { AppHeader } from "../../../Home/header/AppHeader";
import { headerLinks } from "../../../Home/Home";
import { useParams } from "react-router-dom";
import SessionClosedDetails from "./SessionClosedDetails";

function SessionClosedHome() {
    const sessionId = (useParams().sessionId ?? -1) as number;
    return (
        <>
            <AppHeader links={headerLinks} />
            <Container className="Main-Page-Container" size="lg">
                <SessionClosedDetails sessionId={sessionId} />
            </Container>
        </>
    );
}

export default SessionClosedHome;

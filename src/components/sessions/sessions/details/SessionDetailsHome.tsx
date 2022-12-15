import React from "react";
import { Container } from "@mantine/core";
import "./SessionHome.css";
import { AppHeader } from "../../../Home/header/AppHeader";
import { headerLinks } from "../../../Home/Home";
import SessionDetails from "./SessionDetails";
import { useParams } from "react-router-dom";

function SessionDetailsHome() {
    const sessionId = (useParams().sessionId ?? -1) as number;
    return (
        <>
            <AppHeader links={headerLinks} />
            <Container className="Main-Page-Container" size="lg">
                <SessionDetails sessionId={sessionId} />
            </Container>
        </>
    );
}

export default SessionDetailsHome;

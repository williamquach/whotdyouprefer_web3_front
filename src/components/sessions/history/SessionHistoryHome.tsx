import React from "react";
import { Container } from "@mantine/core";
import "./SessionHistory.css";
import { AppHeader } from "../../Home/header/AppHeader";
import { headerLinks, personalLinks } from "../../Home/Home";
import SessionHistory from "./SessionHistory";

function SessionHistoryHome() {
    return (
        <>
            <AppHeader links={headerLinks} otherLinks={personalLinks} />
            <Container className="Main-Page-Container" size="lg">
                <SessionHistory />
            </Container>
        </>
    );
}

export default SessionHistoryHome;

import React from "react";
import { Container } from "@mantine/core";
import "./SessionHistory.css";
import { AppHeader } from "../../Home/header/AppHeader";
import { headerLinks } from "../../Home/Home";
import SessionHistory from "./SessionHistory";

function SessionHistoryHome() {
    return (
        <>
            <AppHeader links={headerLinks} />
            <Container className="Main-Page-Container" size="lg">
                <SessionHistory />
            </Container>
        </>
    );
}

export default SessionHistoryHome;

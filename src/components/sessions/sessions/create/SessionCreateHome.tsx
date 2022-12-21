import React from "react";
import { Container } from "@mantine/core";
import "./SessionCreate.css";
import SessionCreate from "./SessionCreate";
import { AppHeader } from "../../../Home/header/AppHeader";
import { headerLinks, personalLinks } from "../../../Home/Home";

function SessionHistoryHome() {
    return (
        <>
            <AppHeader links={headerLinks} otherLinks={personalLinks} />
            <Container className="Main-Page-Container" size="lg">
                <SessionCreate />
            </Container>
        </>
    );
}

export default SessionHistoryHome;

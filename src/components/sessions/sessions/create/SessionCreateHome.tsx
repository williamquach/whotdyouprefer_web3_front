import React from "react";
import { Container } from "@mantine/core";
import "./SessionCreate.css";
import SessionCreate from "./SessionCreate";
import { AppHeader } from "../../../Home/header/AppHeader";
import { headerLinks } from "../../../Home/Home";

function SessionHistoryHome() {
    return (
        <>
            <AppHeader links={headerLinks} />
            <Container className="Main-Page-Container" size="lg">
                <SessionCreate />
            </Container>
        </>
    );
}

export default SessionHistoryHome;

import React from "react";
import { Container } from "@mantine/core";
import Sessions from "../votes/sessions/Sessions";
import "./Home.css";
import { AppHeader } from "./header/AppHeader";

export function Home() {
    const links = [
        { label: "Accueil", link: "/" },
        { label: "Historique de vote", link: "/historic" }, // TODO
        { label: "Compte", link: "/account" }  // TODO
    ];

    return (
        <>
            <AppHeader links={links} />
            <Container className="Main-Page-Container" size="lg">
                <Sessions />
            </Container>
        </>
    );
}
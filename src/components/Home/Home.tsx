import React from "react";
import { Container } from "@mantine/core";
import Sessions from "../sessions/sessions/Sessions";
import "./Home.css";
import { AppHeader } from "./header/AppHeader";

export const headerLinks = [
    { label: "🏠 Accueil", link: "/" },
    { label: "➕ Créer une session de vote", link: "/sessions/create" },
    { label: "📖 Historique", link: "/history" },
    { label: "🫵 Compte", link: "/account" }
];

export function Home() {

    return (
        <>
            <AppHeader links={headerLinks} />
            <Container className="Main-Page-Container" size="lg">
                <Sessions />
            </Container>
        </>
    );
}
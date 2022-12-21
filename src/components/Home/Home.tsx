import React from "react";
import { Container } from "@mantine/core";
import Sessions from "../sessions/sessions/Sessions";
import "./Home.css";
import { AppHeader } from "./header/AppHeader";

export const headerLinks = [
    { label: "🏠 Accueil", link: "/" },
    { label: "➕ Créer une session de vote", link: "/sessions/create" },
    { label: "📖 Historique", link: "/history" }
];

export const personalLinks = [
    { label: "🫵 Compte", link: "/account" },
    { label: "💸 Dons", link: "/donation" }
];


export function Home() {

    return (
        <>
            <AppHeader links={headerLinks} otherLinks={personalLinks} />
            <Container className="Main-Page-Container" size="lg">
                <Sessions />
            </Container>
        </>
    );
}
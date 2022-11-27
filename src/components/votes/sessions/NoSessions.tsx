import React from "react";
import { Center } from "@mantine/core";
import "./Sessions.css";

function NoSessions() {
    return (
        <>
            <Center>
                <p>Aucune session de vote ouverte</p>
            </Center>
        </>
    );
}

export default NoSessions;

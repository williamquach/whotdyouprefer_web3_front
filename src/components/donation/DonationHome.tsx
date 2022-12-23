import React from "react";
import { Container } from "@mantine/core";
import Donation from "./Donation";
import { headerLinks, personalLinks } from "../Home/Home";
import { AppHeader } from "../Home/header/AppHeader";

function DonationHome() {
    return (
        <>
            <AppHeader links={headerLinks} otherLinks={personalLinks} />
            <Container className="Main-Page-Container" size="lg">
                <Donation />
            </Container>
        </>
    );
}

export default DonationHome;

import React from "react";
import { Container } from "@mantine/core";
import "./Account.css";
import { AppHeader } from "../../Home/header/AppHeader";
import { headerLinks } from "../../Home/Home";
import Account from "./Account";

function AccountHome() {
    return (
        <>
            <AppHeader links={headerLinks} />
            <Container className="Main-Page-Container" size="lg">
                <Account />
            </Container>
        </>
    );
}

export default AccountHome;

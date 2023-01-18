import React, { useEffect } from "react";
import "./App.css";
import Connect from "./components/metamask/connected/Connect";
import { Route, Routes } from "react-router-dom";
import Welcome from "./components/welcome/Welcome";
import Connecting from "./components/metamask/connected/Connecting";
import NotFound from "./components/errors/NotFound";
import { Container } from "@mantine/core";
import { Home } from "./components/Home/Home";
import SessionHistoryHome from "./components/sessions/history/SessionHistoryHome";
import AccountHome from "./components/user/account/AccountHome";
import SessionDetailsHome from "./components/sessions/sessions/details/SessionDetailsHome";
import SessionClosedHome from "./components/sessions/history/details/SessionClosedHome";
import { useConnectWallet, useWallets } from "@web3-onboard/react";
import SessionCreateHome from "./components/sessions/sessions/create/SessionCreateHome";
import "dayjs/locale/fr";
import DonationHome from "./components/donation/DonationHome";
import { SmartContractService } from "./smart-contracts/smart-contract-service";

function App() {
    const [{ wallet, connecting }, connect] = useConnectWallet();
    const connectedWallets = useWallets();
    console.log("Wallet from useConnectWallet", wallet);
    console.log("Connected wallets", connectedWallets);

    useEffect(() => {
        SmartContractService.setConnectedWalletsInStorage(connectedWallets);
    }, [wallet, connectedWallets]);

    useEffect(() => {
        const previouslyConnectedWalletLabels = SmartContractService.getConnectedWalletsFromStorage();
        if (previouslyConnectedWalletLabels?.length) {
            SmartContractService.connectWalletFromStorage(previouslyConnectedWalletLabels, connect).then((connectedWallet) => console.log("Wallet connected from local storage : ", connectedWallet));
        }
    }, [connect]);

    if (connecting) {
        return (
            <Container className="App">
                <Connecting />
            </Container>
        );
    }
    if (wallet) {
        return (
            <Container className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/account" element={<AccountHome />} />
                    <Route path="/donation" element={<DonationHome />} />
                    <Route path="/history" element={<SessionHistoryHome />} />
                    <Route path="/sessions/create" element={<SessionCreateHome />} />
                    <Route path="/sessions/:sessionId" element={<SessionDetailsHome />} />
                    <Route path="/sessions/closed/:sessionId" element={<SessionClosedHome />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Container>
        );
    }
    return (
        <Container className="App">
            <Connect />
        </Container>
    );
}


export default App;

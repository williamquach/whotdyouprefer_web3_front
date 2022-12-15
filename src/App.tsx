import React from "react";
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
import injectedModule from "@web3-onboard/injected-wallets";
import { init, useConnectWallet } from "@web3-onboard/react";
import SessionCreateHome from "./components/sessions/sessions/create/SessionCreateHome";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.locale("fr");
dayjs.extend(LocalizedFormat);

const injected = injectedModule();
// const MAINNET_RPC_URL = "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
// const MAINNET_RPC_URL = `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`;
const MAINNET_RPC_URL = `http://localhost:8545`;

init({
    wallets: [injected],
    chains: [
        {
            id: "0x1",
            token: "ETH",
            label: "Ethereum Mainnet",
            rpcUrl: MAINNET_RPC_URL
        }
    ]
});

function App() {
    const [{ wallet, connecting }] = useConnectWallet();
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

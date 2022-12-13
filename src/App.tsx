import React from "react";
import "./App.css";
import Connect from "./components/metamask/connected/Connect";
import { Route, Routes } from "react-router-dom";
import Welcome from "./components/welcome/Welcome";
import Connecting from "./components/metamask/connected/Connecting";
import NotFound from "./components/errors/NotFound";
import { Container } from "@mantine/core";
import { Home } from "./components/Home/Home";
import SessionHistoryHome from "./components/votes/history/SessionHistoryHome";
import AccountHome from "./components/user/account/AccountHome";
import SessionHome from "./components/votes/sessions/details/SessionHome";
import SessionClosedHome from "./components/votes/history/details/SessionClosedHome";
import injectedModule from "@web3-onboard/injected-wallets";
import { init, useConnectWallet } from "@web3-onboard/react";

const injected = injectedModule();
const MAINNET_RPC_URL = "https://mainnet.infura.io/v3/<INFURA_KEY>";

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
                    <Route path="/sessions/:id" element={<SessionHome />} />
                    <Route path="/sessions/closed/:id" element={<SessionClosedHome />} /> {/* TODO */}
                    {/*<Route path="/crypto-wallet/unavailable" element={<Unavailable />} />*/}
                    {/*<Route path="/crypto-wallet/initializing" element={<Initialization />} />*/}
                    {/*<Route path="/crypto-wallet/connect" element={<Connect connect={connect} />} />*/}
                    {/*<Route path="/crypto-wallet/connecting" element={<Connecting />} />*/}
                    {/*<Route path="/sessions/opened" element={<Sessions />} />*/}
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

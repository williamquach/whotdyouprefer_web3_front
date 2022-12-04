import React from "react";
import "./App.css";
import { useMetaMask } from "metamask-react";
import Connect from "./components/metamask/connected/Connect";
import Unavailable from "./components/metamask/connected/Unavailable";
import Initialization from "./components/metamask/connected/Initialization";
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

function App() {
    const { status, connect } = useMetaMask();
    if (status === "notConnected") {
        return (
            <Container className="App">
                <Connect connect={connect} />
            </Container>
        );
    } else if (status === "unavailable") {
        return (
            <Container className="App">
                <Unavailable />
            </Container>
        );
    } else if (status === "connecting") {
        return (
            <Container className="App">
                <Connecting />
            </Container>
        );
    } else if (status === "initializing") {
        return (
            <Container className="App">
                <Initialization />
            </Container>
        );
    }
    return (
        <Container className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/account" element={<AccountHome />} />
                <Route path="/history" element={<SessionHistoryHome />} />
                <Route path="/sessions/:id" element={<SessionHome />} />
                <Route path="/sessions/closed/:id" element={<SessionClosedHome />} /> {/* TODO */}
                <Route path="/crypto-wallet/unavailable" element={<Unavailable />} />
                <Route path="/crypto-wallet/initializing" element={<Initialization />} />
                <Route path="/crypto-wallet/connect" element={<Connect connect={connect} />} />
                <Route path="/crypto-wallet/connecting" element={<Connecting />} />
                {/*<Route path="/sessions/opened" element={<Sessions />} />*/}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Container>
    );
}


export default App;

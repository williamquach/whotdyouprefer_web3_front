import React, { useEffect, useState } from "react";
import { Center, Col, Container, Grid, Tabs } from "@mantine/core";
import SessionUserIsCreatorInHistory from "./SessionUserIsCreatorInHistory";
import NoSessions from "../sessions/NoSessions";
import "./SessionHistory.css";
import { orderSessionsFromNewestToOldest, Session } from "../../../models/sessions/session.model";
import { useConnectWallet } from "@web3-onboard/react";
import { SmartContractService } from "../../../smart-contracts/smart-contract-service";
import { SessionService } from "../../../services/session.service";
import { IconCertificate, IconWriting } from "@tabler/icons";
import SessionUserHasVotedOnInHistory from "./SessionUserHasVotedOnInHistory";

function SessionHistory() {
    const [{ wallet }] = useConnectWallet();
    const [closedSessionsWhereUserHasVotedOn, setClosedSessionsWhereUserHasVotedOn] = useState<Session[]>([]);
    const [closedSessionsWhereUserIsCreator, setClosedSessionsWhereUserIsCreator] = useState<Session[]>([]);

    const getClosedSessionsWhereUserHasVotedOn = async () => {
        if (wallet) {
            const { voteContract } = SmartContractService.loadVoteContract(wallet);
            const closedSessionsWhereUserHasVotedOn = await SessionService.getClosedSessionsWhereSenderHasVoted(voteContract);
            setClosedSessionsWhereUserHasVotedOn(closedSessionsWhereUserHasVotedOn);
        }
    };

    const getClosedSessionsWhereUserIsCreator = async () => {
        if (wallet) {
            const { voteContract } = SmartContractService.loadVoteContract(wallet);
            const closedSessionsWhereUserIsCreator = await SessionService.getClosedSessionsWhereSenderIsCreator(voteContract);
            setClosedSessionsWhereUserIsCreator(closedSessionsWhereUserIsCreator);
        }
    };

    useEffect(() => {
        Promise.all([getClosedSessionsWhereUserHasVotedOn(), getClosedSessionsWhereUserIsCreator()])
            .catch((error) => console.error("Error while loading closed sessions", error));
    }, [wallet]);

    return (
        <>
            <Container>
                <Center>
                    <h1 className="Session-Cards-Title">Historique de vote</h1>
                </Center>
                <Tabs color="green" defaultValue="has-voted-on">
                    <Tabs.List>
                        <Tabs.Tab value="has-voted-on" icon={<IconCertificate size={20} />}>
                            A voté
                        </Tabs.Tab>
                        <Tabs.Tab value="has-created-it" icon={<IconWriting size={20} />}>
                            Créé(s) de ma main
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="has-voted-on" pt="xs">
                        {closedSessionsWhereUserHasVotedOn.length === 0 && (
                            <NoSessions />
                        )}
                        {closedSessionsWhereUserHasVotedOn.length > 0 && (
                            <Grid className="Session-Cards" gutter="lg">
                                {orderSessionsFromNewestToOldest(closedSessionsWhereUserHasVotedOn).map((closedSession) => (
                                    <Col md={6} lg={6} key={closedSession.sessionId}>
                                        <SessionUserHasVotedOnInHistory session={closedSession} />
                                    </Col>
                                ))}
                            </Grid>
                        )}
                    </Tabs.Panel>

                    <Tabs.Panel value="has-created-it" pt="xs">
                        {closedSessionsWhereUserIsCreator.length === 0 && (
                            <NoSessions />
                        )}
                        {closedSessionsWhereUserIsCreator.length > 0 && (
                            <Grid className="Session-Cards" gutter="lg">
                                {orderSessionsFromNewestToOldest(closedSessionsWhereUserIsCreator).map((session) => (
                                    <Col md={6} lg={6} key={session.sessionId}>
                                        <SessionUserIsCreatorInHistory session={session} />
                                    </Col>
                                ))}
                            </Grid>
                        )}
                    </Tabs.Panel>
                </Tabs>
            </Container>
        </>
    );
}

export default SessionHistory;

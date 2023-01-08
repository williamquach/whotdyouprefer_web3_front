import React, { useEffect, useState } from "react";
import { Alert, Button, Center, Chip, Container, Divider, LoadingOverlay, Menu, Table, Text } from "@mantine/core";
import "./SessionClosed.css";
import { useNavigate } from "react-router-dom";
import { navigateTo } from "../../../../utils/redirect.util";
import dayjs from "dayjs";
import { SmartContractService } from "../../../../smart-contracts/smart-contract-service";
import { SessionService } from "../../../../services/session.service";
import { showNotification } from "@mantine/notifications";
import { IconInfoCircle, IconX } from "@tabler/icons";
import { useConnectWallet } from "@web3-onboard/react";
import { SessionClosed } from "../../../../models/sessions/session-closed.model";
import { orderSessionChoicesByIdAsc } from "../../../../models/sessions/session-choice.model";
import Label = Menu.Label;

function SessionClosedDetails(props: { sessionId: number }) {
    const navigate = useNavigate();
    const goBack = () => {
        navigateTo("/history", navigate);
    };

    const [{ wallet }] = useConnectWallet();
    const [sessionLoadError, setSessionLoadError] = useState<boolean>();
    const [closedSession, setClosedSession] = useState<SessionClosed | undefined>();
    const [preferenceCount, setPreferenceCount] = useState<number>(0);
    const [preferences, setPreferences] = useState<(number | undefined)[]>([]);

    const findClosedSessionById = async () => {
        if (wallet) {
            const { voteContract } = SmartContractService.loadVoteContract(wallet);
            try {
                const foundClosedSession = await SessionService.findClosedSessionById(voteContract, props.sessionId);
                if (!foundClosedSession) throw new Error(`Session closed with id ${props.sessionId} not found`);
                setClosedSession(foundClosedSession);
                setPreferenceCount(foundClosedSession.session.choices.length);
                setPreferences(Array.from(Array(preferenceCount).map(() => undefined)));
            } catch (error) {
                setSessionLoadError(true);
                showNotification({
                    title: "Erreur",
                    message: "Impossible de charger la closedSession de vote",
                    color: "red",
                    icon: <IconX size={24} />
                });
            }
        }
    };

    useEffect(() => {
        findClosedSessionById()
            .catch((error) => console.error("Error while loading closed closedSession details", error));
    }, [wallet]);

    function shouldDisableChoice(preferenceIndex: number, index: number) {
        if (closedSession) {
            const choiceIdInUserVote = closedSession.session.vote.choiceIds[preferenceIndex];
            const found = closedSession.session.choices.find((choice) => choice.id.toString() === choiceIdInUserVote.toString());
            if (found) {
                return closedSession.session.hasVoted && index != closedSession.session.choices.indexOf(found);
            }
            return true;
        }
        throw new Error("Closed session is not set");
    }

    return (
        <>
            <Container>
                <Button
                    variant="outline"
                    color="gray"
                    onClick={() => {
                        goBack();
                    }}
                    style={{ marginTop: "2vh" }}
                >
                    Retour
                </Button>

                {!closedSession && !sessionLoadError && (
                    <>
                        <Center>
                            <h3 className="Session-Title">Chargement...</h3>
                        </Center>
                        <LoadingOverlay
                            loaderProps={{ size: "lg", color: "pink", variant: "dots" }}
                            overlayOpacity={0.3}
                            overlayColor="#c5c5c5"
                            visible
                        />
                    </>
                )}

                {sessionLoadError && (
                    <>
                        <Center>
                            <h3 className="Session-Title">Erreur lors du chargement de la session</h3>
                        </Center>
                    </>
                )}

                {closedSession && (
                    <>

                        <Center>
                            <h1 className="Session-Cards-Title">{closedSession.session.label}</h1>
                        </Center>
                        <Container className="Session-Details-Container">
                            <Center>
                                <h2>
                                    Gagnant :
                                </h2>
                                <Chip.Group
                                    className={"Session-Choices-Preferences"}
                                    key={0}
                                    position="center" multiple={false}
                                    value={closedSession.choiceIdWinner.toString()}
                                >
                                    <Chip
                                        color="green"
                                        style={{ marginLeft: "1vw" }}
                                        value={closedSession.choiceIdWinner.toString()}
                                    >
                                        {closedSession.session.choices.find((choice, index) => index.toString() === closedSession?.choiceIdWinner.toString())?.label}
                                    </Chip>
                                </Chip.Group>
                            </Center>
                            <Center>
                                <h2>
                                    Résultats* :
                                </h2>
                            </Center>
                            <Center>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Choix/Préférence</th>
                                            {Array.from(Array(preferenceCount).keys()).map((preferenceIndex) => (
                                                <th key={preferenceIndex}>Préférence {preferenceIndex + 1}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {closedSession.session.choices.map((choice, choiceIndex) => (
                                            <tr key={choiceIndex}>
                                                <td>{choice.label}</td>
                                                {closedSession?.result[choiceIndex].map((result, preferenceIndex) => (
                                                    <td key={preferenceIndex}>
                                                        {result.toString()}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Center>
                            <Center>
                                <Alert icon={<IconInfoCircle size={16} />} title="Information" color="green"
                                    style={{ marginTop: "2vh" }} variant="outline">
                                    <em>
                                        * Les résultats sont calculés en fonction du nombre de votes par
                                        préférences
                                    </em>
                                    <br />
                                    <em>
                                        (voir
                                        <a
                                            href="https://fr.wikipedia.org/wiki/Syst%C3%A8me_%C3%A9lectoral_%C3%A0_pr%C3%A9f%C3%A9rences_multiples_ordonn%C3%A9es">Système
                                            électoral à préférences multiples ordonnées
                                        </a>)
                                    </em>
                                </Alert>
                            </Center>

                            <Center>
                                <h2>Vos Choix : </h2>
                            </Center>
                            {orderSessionChoicesByIdAsc(closedSession.session.choices).map((choice, preferenceIndex) => (
                                <>
                                    <Center>
                                        <Label>
                                            Préférence {preferenceIndex + 1} :
                                        </Label>
                                        <Chip.Group
                                            className={"Session-Choices-Preferences"}
                                            key={preferenceIndex}
                                            position="center" multiple={false}
                                            value={closedSession?.session.hasVoted ? closedSession.session.vote.choiceIds[preferenceIndex].toString() : String(preferences[preferenceIndex])}
                                        >
                                            {orderSessionChoicesByIdAsc(closedSession.session.choices).map((choice, index) => (
                                                <>
                                                    <Chip
                                                        key={choice.id}
                                                        value={choice.id.toString()}
                                                        disabled={shouldDisableChoice(preferenceIndex, index)}
                                                    >
                                                        {choice.label}
                                                    </Chip>
                                                </>
                                            ))}
                                        </Chip.Group>
                                    </Center>
                                </>
                            ))}
                            <Divider style={{ marginTop: "2vh" }} />
                            <Text fz="sm" ta="right">
                                <p className="Session-Details-Description">
                                    <strong>Fermeture : </strong>
                                    {dayjs(closedSession.session.expiresAt).format("LLLL")}
                                </p>
                            </Text>
                        </Container>
                    </>
                )}
            </Container>
        </>
    );
}

export default SessionClosedDetails;

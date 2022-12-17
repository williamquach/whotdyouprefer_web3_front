import React, { useEffect, useState } from "react";
import { Button, Center, Chip, Container, LoadingOverlay, Menu } from "@mantine/core";
import "./Session.css";
import { orderSessionChoicesByIdAsc } from "../../../../models/sessions/session-choice.model";
import { Session } from "../../../../models/sessions/session.model";
import { useNavigate } from "react-router-dom";
import { navigateTo } from "../../../../utils/redirect.util";
import { SmartContractService } from "../../../../smart-contracts/smart-contract-service";
import { SessionService } from "../../../../services/session.service";
import { useConnectWallet } from "@web3-onboard/react";
import dayjs from "dayjs";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import Label = Menu.Label;

function SessionDetails(props: { sessionId: number }) {
    const navigate = useNavigate();
    const goBack = () => {
        navigateTo("/", navigate);
    };

    const [{ wallet }] = useConnectWallet();
    const [sessionLoadError, setSessionLoadError] = useState<boolean>();
    const [session, setSession] = useState<Session | undefined>();
    const [preferenceCount, setPreferenceCount] = useState<number>(0);
    const [preferences, setPreferences] = useState<(number | undefined)[]>([]);
    const [voteIsBeingSent, setVoteIsBeingSent] = useState<boolean>(false);
    const [voteCreationError, setVoteCreationError] = useState<boolean>();

    const findSessionById = async () => {
        if (wallet) {
            const { contract } = await SmartContractService.load(wallet);
            try {
                const foundOpenedSessions = await SessionService.findSessionById(contract, props.sessionId);
                setSession(foundOpenedSessions);
                setPreferenceCount(foundOpenedSessions.choices.length);
                setPreferences(Array.from(Array(preferenceCount).map(() => undefined)));
            } catch (error) {
                setSessionLoadError(true);
                showNotification({
                    title: "Erreur",
                    message: "Impossible de charger la session de vote",
                    color: "red",
                    icon: <IconX size={24} />
                });
            }
        }
    };

    const unselectAlreadySelectedPreferences = (newPreferences: (number | undefined)[], choiceId: number): (number | undefined)[] => {
        return preferences.map((preference) => {
            if (preference === choiceId) {
                return undefined;
            }
            return preference;
        });
    };
    const updatePreferences = (preferenceIndex: number, choiceId: string) => {
        const newPreferences = unselectAlreadySelectedPreferences(preferences, parseInt(choiceId));
        newPreferences[preferenceIndex] = parseInt(choiceId);
        setPreferences(newPreferences);
    };

    useEffect(() => {
        findSessionById()
            .then(() => console.log("Session loaded : ", session))
            .catch((error) => console.error("Error while loading session details", error));
    }, [wallet]);

    const sendVote = async () => {
        setVoteCreationError(false);
        if (!session) {
            alert("Session not set ???? Why you vote ? What are you doing ????");
            return;
        }
        if (preferences.length === 0) {
            showNotification({
                title: "Attention",
                message: "Vous devez choisir au moins une préférence",
                color: "red",
                autoClose: 2500
            });
            return;
        }
        const isAllChoicePutInPreferences = preferences.find((preference) => {
            return preference === undefined;
        });
        if (isAllChoicePutInPreferences !== undefined) {
            showNotification({
                title: "Attention",
                message: "Vous devez faire un choix pour chaque préférence",
                color: "red",
                autoClose: 4000
            });
            return;
        }

        const formattedPreferences = preferences.map((preference) => {
            if (preference == undefined) {
                setVoteIsBeingSent(false);
                throw new Error("A preference is undefined bro");
            }
            return preference;
        });
        try {
            setVoteIsBeingSent(true);
            const { contract } = await SmartContractService.load(wallet);
            await SessionService.vote(contract, session.sessionId, formattedPreferences.map((preference) => preference));
            SmartContractService.listenToEvent(contract, "NewVote", (voteId, sessionId, choiceIds) => {
                if (choiceIds.length > 0) {
                    showNotification({
                        title: "Vote envoyé",
                        message: `Votre vote a bien été envoyé pour la session : '${session.label}'`,
                        color: "green",
                        icon: <IconCheck size={20} />,
                        autoClose: 2500,
                        onClose: () => {
                            setVoteIsBeingSent(false);
                            navigateTo("/", navigate);
                        }
                    });
                }
            });
        } catch (error) {
            setVoteIsBeingSent(false);
            setVoteCreationError(true);
            showNotification({
                title: "Erreur",
                message: "Impossible d'envoyer votre vote",
                color: "red",
                icon: <IconX size={24} />
            });
        }
    };

    function shouldDisableChoice(preferenceIndex: number, index: number) {
        if (session) {
            return session.hasVoted && session.vote.choiceIds[preferenceIndex] != index;
        }
        throw new Error("Session is not set");
    }

    return (
        <>
            <Container>
                {voteIsBeingSent && (
                    <>
                        <LoadingOverlay
                            loaderProps={{ size: "lg", color: "pink", variant: "dots" }}
                            overlayOpacity={0.3}
                            overlayColor="#c5c5c5"
                            visible
                        />
                    </>
                )}
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

                {!session && !sessionLoadError && (
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
                {session && (
                    <>
                        <Center>
                            <h1 className="Session-Cards-Title">{session.label}</h1>
                        </Center>
                        {voteCreationError && (
                            <>
                                <Center>
                                    <h3 className="Session-Title">Erreur lors de la soumission de votre vote</h3>
                                </Center>
                            </>
                        )}
                        <Container className="Session-Details-Container">
                            <Center>
                                <p className="Session-Details-Description">
                                    <em>
                                        Votez en classant les choix dans l'ordre de vos préférences en cliquant sur les
                                        boutons correspondants. (Vous ne pouvez pas voter pour un choix plus d'une fois)
                                    </em>
                                </p>
                            </Center>
                            <Center>
                                <p className="Session-Details-Description">
                                    <strong>Date de fin : </strong>
                                    {dayjs(session.expiresAt).format("LLLL")}
                                </p>
                            </Center>
                            <Center>
                                <h2>Choix : </h2>
                            </Center>
                            {orderSessionChoicesByIdAsc(session.choices).map((choice, preferenceIndex) => (
                                <>
                                    <Center>
                                        <Label>
                                            Préférence {preferenceIndex + 1} :
                                        </Label>
                                        <Chip.Group
                                            className={"Session-Choices-Preferences"}
                                            key={preferenceIndex}
                                            position="center" multiple={false}
                                            value={session?.hasVoted ? session.vote.choiceIds[preferenceIndex].toString() : String(preferences[preferenceIndex])}
                                            onChange={(event) => updatePreferences(preferenceIndex, event)}>
                                            {orderSessionChoicesByIdAsc(session.choices).map((choice, index) => (
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
                            <Button
                                className="Vote-Button"
                                onClick={sendVote}
                                disabled={session?.hasVoted}
                            >
                                <Center>
                                    {session.hasVoted && (<> <em>Vous avez déjà voté pour cette session</em> </>)}
                                    {!session.hasVoted && (<> <p>Envoyer mon vote</p> </>)}
                                </Center>
                            </Button>
                        </Container>
                    </>
                )}
            </Container>
        </>
    );
}

export default SessionDetails;
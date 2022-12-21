import React, { useEffect, useState } from "react";
import { Button, Center, Chip, Container, LoadingOverlay, Menu } from "@mantine/core";
import "./SessionClosed.css";
import { useNavigate } from "react-router-dom";
import { navigateTo } from "../../../../utils/redirect.util";
import dayjs from "dayjs";
import { Session } from "../../../../models/sessions/session.model";
import { SmartContractService } from "../../../../smart-contracts/smart-contract-service";
import { SessionService } from "../../../../services/session.service";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";
import { useConnectWallet } from "@web3-onboard/react";
import { orderSessionChoicesByIdAsc } from "../../../../models/sessions/session-choice.model";
import Label = Menu.Label;

function SessionClosedDetails(props: { sessionId: number }) {
    const navigate = useNavigate();
    const goBack = () => {
        navigateTo("/history", navigate);
    };

    const [{ wallet }] = useConnectWallet();
    const [sessionLoadError, setSessionLoadError] = useState<boolean>();
    const [closedSession, setClosedSession] = useState<Session | undefined>();
    const [preferenceCount, setPreferenceCount] = useState<number>(0);
    const [preferences, setPreferences] = useState<(number | undefined)[]>([]);

    const findClosedSessionById = async () => {
        if (wallet) {
            const { contract } = await SmartContractService.load(wallet);
            try {
                const foundClosedSession = await SessionService.findSessionById(contract, props.sessionId);
                setClosedSession(foundClosedSession);
                setPreferenceCount(foundClosedSession.choices.length);
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
            .then(() => console.log("Closed closedSession loaded : ", closedSession))
            .catch((error) => console.error("Error while loading closed closedSession details", error));
    }, [wallet]);

    function shouldDisableChoice(preferenceIndex: number, index: number) {
        if (closedSession) {
            const choiceIdInUserVote = closedSession.vote.choiceIds[preferenceIndex];
            const found = closedSession.choices.find((choice) => choice.id.toString() === choiceIdInUserVote.toString());
            if (found) {
                return closedSession.hasVoted && index != closedSession.choices.indexOf(found);
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
                            <h1 className="Session-Cards-Title">{closedSession.label}</h1>
                        </Center>
                        <Container className="Session-Details-Container">
                            <Center>
                                <p className="Session-Details-Description">
                                    <strong>Fermeture : </strong>
                                    {dayjs(closedSession.expiresAt).format("LLLL")}
                                </p>
                            </Center>
                            <Center>
                                <h2>Choix : </h2>
                            </Center>
                            {orderSessionChoicesByIdAsc(closedSession.choices).map((choice, preferenceIndex) => (
                                <>
                                    <Center>
                                        <Label>
                                            Préférence {preferenceIndex + 1} :
                                        </Label>
                                        <Chip.Group
                                            className={"Session-Choices-Preferences"}
                                            key={preferenceIndex}
                                            position="center" multiple={false}
                                            value={closedSession?.hasVoted ? closedSession.vote.choiceIds[preferenceIndex].toString() : String(preferences[preferenceIndex])}
                                        >
                                            {orderSessionChoicesByIdAsc(closedSession.choices).map((choice, index) => (
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
                        </Container>
                    </>
                )}
            </Container>
        </>
    );
}

export default SessionClosedDetails;

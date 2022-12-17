import React, { useState } from "react";
import { Button, Center, Col, Container, Grid, LoadingOverlay, TextInput } from "@mantine/core";
import "./SessionCreate.css";
import { DatePicker, TimeInput } from "@mantine/dates";
import dayjs from "dayjs";
import { SessionService } from "../../../../services/session.service";
import { SmartContractService } from "../../../../smart-contracts/smart-contract-service";
import { useConnectWallet } from "@web3-onboard/react";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { navigateTo } from "../../../../utils/redirect.util";

function SessionCreate() {
    const [sessionName, setSessionName] = useState<string>("");
    const [sessionDescription, setSessionDescription] = useState<string>("");
    const [sessionEndDate, setSessionEndDate] = useState<Date | null>(dayjs().add(1, "day").toDate());
    const [sessionEndTime, setSessionEndTime] = useState<Date>(dayjs().hour(0).minute(0).toDate());
    const [sessionChoices, setSessionChoices] = useState<Array<string>>(["", "", "", ""]);
    const [sessionIsBeingCreated, setSessionIsBeingCreated] = useState<boolean>(false);
    const [sessionCreationError, setSessionCreationError] = useState<boolean>();

    const [{ wallet }] = useConnectWallet();
    const navigate = useNavigate();

    const createSession = async () => {
        setSessionCreationError(false);
        if (wallet) {
            const { contract } = await SmartContractService.load(wallet);
            setSessionIsBeingCreated(true);
            try {
                await SessionService.createSession(contract, {
                    label: sessionName,
                    description: sessionDescription,
                    expiresAt: dayjs(sessionEndDate).hour(dayjs(sessionEndTime).hour()).minute(dayjs(sessionEndTime).minute()).toDate(),
                    choices: sessionChoices
                });
                SmartContractService.listenToEvent(contract, "NewSession", (sessionId, label, description, endDateTime, choices) => {
                    if (endDateTime > 0) {
                        showNotification({
                            title: "Session créée",
                            message: "La session devrait être disponible à l'accueil ☺️",
                            color: "green",
                            icon: <IconCheck size={20} />,
                            autoClose: 2500,
                            onClose: () => {
                                setSessionIsBeingCreated(false);
                                navigateTo("/", navigate);
                            }
                        });
                    }
                });
            } catch (e) {
                setSessionIsBeingCreated(false);
                setSessionCreationError(true);
                console.error(e);
            }
        }
    };
    return (
        <>
            <Container>
                {sessionIsBeingCreated && (
                    <>
                        <Center>
                            <h3 className="Session-Title">Création de la session en cours...</h3>
                        </Center>
                        <LoadingOverlay
                            loaderProps={{ size: "lg", color: "pink", variant: "dots" }}
                            overlayOpacity={0.3}
                            overlayColor="#c5c5c5"
                            visible
                        />
                    </>
                )}
                <Center>
                    <h1 className="Session-Cards-Title">Création d'une session de vote</h1>
                </Center>
                {sessionCreationError && (
                    <>
                        <Center>
                            <h3 className="Session-Title">Erreur lors de la création de la session</h3>
                        </Center>
                    </>
                )}
                <Grid className="Session-Create-Fields Session-Form" gutter="lg">
                    <Col sm={6} md={6} lg={6}>
                        {/*  Session creation fields : string label, string description, Date endDateTime */}
                        <TextInput
                            className={"Session-Form-Field"}
                            placeholder="Le meilleur restaurant"
                            label="Sujet de la session"
                            description="Sur quoi porte le vote ?"
                            // error="Le nom du sujet doit être renseigné"
                            withAsterisk
                            value={sessionName}
                            onChange={(event) => setSessionName(event.currentTarget.value)}
                        />

                        <TextInput
                            className={"Session-Form-Field"}
                            placeholder="Votez pour le meilleur restaurant de la belle ville de Paris"
                            label="Description"
                            description="Décrivez le sujet de la session"
                            value={sessionDescription}
                            onChange={(event) => setSessionDescription(event.currentTarget.value)}
                        />

                        <DatePicker
                            className={"Session-Form-Field"}
                            placeholder="Date de fin"
                            label="Date de fin"
                            description="La session se fermera à cette date"
                            withAsterisk
                            value={sessionEndDate}
                            onChange={setSessionEndDate}
                            minDate={dayjs(new Date()).add(1, "hour").toDate()}
                        />
                        <TimeInput
                            className={"Session-Form-Field"}
                            label="Heure de fin"
                            description="La session se fermera à cette heure"
                            value={sessionEndTime}
                            onChange={setSessionEndTime}
                            withAsterisk
                        />
                    </Col>
                    <Col sm={6} md={6} lg={6}>
                        {/*  Choices  */}
                        {sessionChoices.map((choice, index) => (
                            <TextInput
                                key={index}
                                className={"Session-Form-Field"}
                                placeholder={`Restaurant ${index + 1}`}
                                label={`Choix ${index + 1}`}
                                description={`Label du choix`}
                                withAsterisk
                                value={sessionChoices[index]}
                                onChange={(event) => {
                                    const newChoices = [...sessionChoices];
                                    newChoices[index] = event.currentTarget.value;
                                    setSessionChoices(newChoices);
                                }}
                            />
                        ))}
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                        <Center>
                            <Button
                                className={"Session-Form-Field"}
                                color="teal"
                                onClick={createSession}
                            >
                                Créer la session
                            </Button>
                        </Center>
                    </Col>
                </Grid>
            </Container>
        </>
    );
}

export default SessionCreate;

import React from "react";
import { Button, Center, Chip, Container } from "@mantine/core";
import "./SessionClosed.css";
import { useNavigate } from "react-router-dom";
import { SessionClosed } from "../../../../models/sessions/session-closed.model";
import { orderSessionClosedChoicesByRankAsc } from "../../../../models/sessions/session-closed-choice.model";
import { navigateTo } from "../../../../utils/redirect.util";

function SessionClosedDetails(props: { session: SessionClosed }) {
    const userVoteChoiceId = props.session.userChoiceId;

    const navigate = useNavigate();
    const goBack = () => {
        navigateTo("/history", navigate);
    };

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

                <Center>
                    <h1 className="Session-Cards-Title">{props.session.label}</h1>
                </Center>
                <Container className="Session-Details-Container">
                    <Center>
                        <p className="Session-Details-Description">
                            <strong>Fermeture : </strong>
                            {props.session.expiresAt.toLocaleString()}
                        </p>
                    </Center>
                    <Center>
                        <h2>Choix : </h2>
                    </Center>
                    <Chip.Group position="center" multiple={false} value={userVoteChoiceId.toString()}>
                        {orderSessionClosedChoicesByRankAsc(props.session.choices).map((choice) => (
                            <>
                                <Chip key={choice.id.toString()} value={choice.id.toString()}>
                                    {choice.label} (Nombre de votes : {choice.votesCount})
                                </Chip>
                            </>
                        ))}
                    </Chip.Group>
                </Container>
            </Container>
        </>
    );
}

export default SessionClosedDetails;

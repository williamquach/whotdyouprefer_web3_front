import React, { useState } from "react";
import { Button, Center, Chip, Container } from "@mantine/core";
import "./Session.css";
import { orderSessionChoicesOrderIdAscendant, SessionChoice } from "../../../../models/sessions/session-choice.model";
import { Session } from "../../../../models/sessions/session.model";
import { useNavigate } from "react-router-dom";

function SessionDetails(props: { session: Session }) {
    const choices: SessionChoice[] = [
        {
            id: 1,
            label: "Pizza 4 fromages"
        },
        {
            id: 2,
            label: "Pizza 4 saisons"
        },
        {
            id: 3,
            label: "Pizza 4 saisons"
        },
        {
            id: 4,
            label: "Pizza 4 saisons"
        }
    ];
    const [value, setValue] = useState((choices[0].id).toString());

    const sendVote = () => {
        console.log("Vote envoyé : " + value);
    };

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    return (
        <>
            <Container>
                {/* Go Back button*/}
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
                    {/*Display end date*/}
                    <Center>
                        <p className="Session-Details-Description">
                            <strong>Date de fin : </strong>
                            {props.session.expiresAt.toLocaleString()}
                        </p>
                    </Center>
                    <Center>
                        <h2>Choix : </h2>
                    </Center>
                    <Chip.Group position="center" multiple={false} value={value} onChange={setValue}>
                        {orderSessionChoicesOrderIdAscendant(choices).map((choice) => (
                            <>
                                <Chip key={choice.id.toString()} value={choice.id.toString()}>{choice.label}</Chip>
                            </>
                        ))}
                    </Chip.Group>
                    <Button className="Vote-Button" onClick={sendVote}>Voter</Button>
                </Container>
            </Container>
        </>
    );
}

export default SessionDetails;

import React, { useEffect, useState } from "react";
import {
    Alert,
    Button,
    Center,
    Container,
    Group,
    List,
    LoadingOverlay,
    MantineTheme,
    Modal,
    NumberInput,
    Slider,
    Stepper,
    Text
} from "@mantine/core";
import { useConnectWallet } from "@web3-onboard/react";
import { IconCheck, IconMedal, IconMoneybag, IconX } from "@tabler/icons";
import { SmartContractService } from "../../smart-contracts/smart-contract-service";
import { showNotification } from "@mantine/notifications";
import { DonateService } from "../../services/donate.service";
import { ethers } from "ethers";

function Donation() {
    const [{ wallet }] = useConnectWallet();
    const { donationContract } = SmartContractService.loadDonationContract(wallet);

    const [donationSending, setDonationSending] = useState<boolean>(false);
    const [donationFailed, setDonationFailed] = useState<boolean>(false);

    const [donationAmount, setDonationAmount] = useState(0);
    const [confirmationOpened, setConfirmationOpened] = useState(false);

    const [totalDonations, setTotalDonations] = useState("");
    const [highestDonation, setHighestDonation] = useState("");
    const [highestDonorAddress, setHighestDonorAddress] = useState("");

    useEffect(() => {
        DonateService.getTotalDonationsAmount(donationContract).then((totalDonations) => {
            setTotalDonations(totalDonations);
        });
        DonateService.getHighestDonation(donationContract).then(({ highestDonationInEther, highestDonorAddress }) => {
            setHighestDonation(highestDonationInEther);
            setHighestDonorAddress(highestDonorAddress);
        });
    }, []);

    const [active, setActive] = useState(0);
    const nextStep = () => {
        setActive((current) => (current < 2 ? current + 1 : current));
        setDonationFailed(false);
    };
    const prevStep = () => {
        setActive((current) => (current > 0 ? current - 1 : current));
        setDonationFailed(false);
    };

    const confirmDonation = () => {
        setConfirmationOpened(true);
    };

    const donate = async () => {
        setDonationFailed(false);
        setDonationSending(true);
        setConfirmationOpened(false);
        if (wallet) {
            try {
                await DonateService.donate(donationContract, donationAmount);
                // Listen to NewDonation(msg.sender, msg.value) event
                SmartContractService.listenToEvent(donationContract, "NewDonation", (sender: string, value) => {
                    if (value > 0) {
                        if (sender.toLowerCase() === wallet.accounts[0].address.toLowerCase()) {
                            showNotification({
                                title: "Don envoyé",
                                message: `Votre don de ${ethers.utils.formatEther(value)} ETH a bien été envoyé !`,
                                color: "green",
                                icon: <IconCheck size={20} />,
                                autoClose: 10000,
                                onOpen: () => {
                                    setDonationSending(false);
                                    nextStep();
                                }
                            });
                        }
                    }
                });
            } catch (e: any) {
                nextStep();
                console.error(e);
                setDonationSending(false);
                if (e.code === "ACTION_REJECTED") {
                    showNotification({
                        title: "Action refusée",
                        message: "Vous avez refusé la transaction",
                        color: "orange",
                        icon: <IconX size={24} />
                    });
                    return;
                }
                setDonationFailed(true);
                showNotification({
                    title: "Erreur",
                    message: "Une erreur est survenue lors de l'envoi de votre don. Veuillez réessayer plus tard.",
                    color: "red",
                    icon: <IconX size={24} />
                });
            } finally {
            }
        }
    };

    const sliderTheme = (theme: MantineTheme) => ({
        track: {
            backgroundColor:
                theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.blue[1]
        },
        mark: {
            width: 12,
            height: 12,
            borderRadius: 6,
            transform: "translateX(-3px) translateY(-2px)",
            borderColor: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.green[1]
        },
        markFilled: {
            borderColor: theme.colors.green
        },
        markLabel: {
            color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[8]
        }
    });

    return (
        <>
            <Container>
                {donationSending && (
                    <>
                        <LoadingOverlay
                            loaderProps={{ size: "lg", color: "pink", variant: "dots" }}
                            overlayOpacity={0.3}
                            overlayColor="#c5c5c5"
                            visible
                        />
                    </>
                )}

                <Center>
                    <h1 className="Session-Cards-Title">Faire un don</h1>
                </Center>
                <br />

                <Stepper active={active} onStepClick={setActive} breakpoint="sm" color="green" size="md">
                    <Stepper.Step
                        label="Montant" description="Choisissez un montant" icon={<IconMoneybag />}
                        completedIcon={<IconCheck />}
                    >
                        <Center>
                            <h2>Étape 1 : Choisissez un montant</h2>
                        </Center>
                        <br />
                        <Slider
                            thumbChildren={<IconMoneybag size={16} />}
                            color="green"
                            thumbSize={26}
                            // styles={{ thumb: { borderWidth: 2, padding: 3 } }}
                            label={"Montant du don : " + donationAmount.toFixed(3) + " ETH"}
                            step={0.01}
                            max={100}
                            marks={[
                                { value: 0, label: "0 ETH" },
                                { value: 25, label: "25 ETH" },
                                { value: 50, label: "50 ETH" },
                                { value: 75, label: "75 ETH" },
                                { value: 100, label: "100 ETH" }
                            ]}
                            value={donationAmount}
                            onChange={setDonationAmount}
                            styles={sliderTheme}
                        />

                        <Center>
                            <NumberInput
                                style={{ padding: "50px 0px 0px 0px", width: "50%" }}
                                min={0}
                                max={100}
                                step={0.001}
                                decimalSeparator="."
                                precision={3}
                                defaultValue={donationAmount}
                                value={donationAmount}
                                onChange={(value) => {
                                    if (value && value >= 0.001) {
                                        setDonationAmount(value);
                                    } else setDonationAmount(0);
                                }}
                                onInput={(event) => {
                                    setDonationAmount(parseInt(event.currentTarget.value));
                                }}
                                placeholder="100"
                                label="Le montant du don"
                                description="Valeur en ETH"
                                size="md"
                                stepHoldDelay={250}
                                stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                            />
                        </Center>

                        <Group position="center" mt="xl">
                            <Button
                                disabled={donationAmount <= 0}
                                onClick={nextStep}
                                variant={"gradient"}
                                gradient={{ from: "#6eedb8", to: "#76b951", deg: 35 }}>
                                Valider le montant
                            </Button>
                        </Group>
                    </Stepper.Step>

                    <Stepper.Step
                        label="Confirmation"
                        description="Vérifiez le montant"
                        allowStepSelect={false}
                        color={donationFailed ? "red" : "green"}
                        icon={donationFailed ? <IconX /> : <IconCheck />}
                        completedIcon={donationFailed ? <IconX /> : <IconCheck />}
                    >
                        <Center>
                            <h2>Étape 2 : Validez le montant du don</h2>
                        </Center>
                        <Center>
                            <Group position="center" mt="xl">
                                <Button variant="default" onClick={prevStep}>Précédent</Button>
                                <Button
                                    variant={"gradient"}
                                    gradient={{ from: "#6eedb8", to: "#76b951", deg: 35 }}
                                    onClick={() => {
                                        confirmDonation();
                                    }}
                                    disabled={donationAmount <= 0}>
                                    Faire un don de {donationAmount.toFixed(3)} ETH 😇
                                </Button>
                            </Group>
                        </Center>
                    </Stepper.Step>

                    <Stepper.Completed>
                        <h3>
                            {donationFailed && (
                                <span>
                                    La transaction a échoué. Veuillez réessayer ! 🥲
                                </span>
                            )}
                            {!donationFailed && (
                                <span>
                                    Merci pour votre don de {donationAmount.toFixed(3)} ETH ! 🥰
                                </span>
                            )}
                        </h3>

                        <Group position="center" mt="xl">
                            <Button
                                variant={"gradient"}
                                gradient={{ from: "#6eedb8", to: "#76b951", deg: 35 }}
                                onClick={() => {
                                    if (donationFailed) {
                                        prevStep();
                                    } else {
                                        setActive(0);
                                    }
                                }}>
                                {
                                    donationFailed ? "Réessayer 🤗" : "Refaire un don 🥰"
                                }
                            </Button>
                        </Group>
                    </Stepper.Completed>
                </Stepper>

                <Alert icon={<IconMedal size={32} />} title="Nos dons ! 🧧" color="green" radius="md"
                    style={{ margin: "20px 20px" }}>
                    <List style={{ textAlign: "left" }}>
                        <List.Item>
                            <Text>
                                {totalDonations} ETH ont déjà été donnés à la communauté ! 🥳
                            </Text>
                        </List.Item>
                        <List.Item>
                            <Text>
                                Le plus gros don a été de {highestDonation} ETH par {highestDonorAddress} ! 🤩
                            </Text>
                        </List.Item>
                    </List>
                </Alert>

                <Modal
                    centered
                    opened={confirmationOpened}
                    onClose={() => setConfirmationOpened(false)}
                    title="Confirmation de don"
                >
                    <div style={{ padding: 15 }}>
                        <h3>Êtes-vous sûr de vouloir faire un don de {donationAmount.toFixed(3)} ETH ? 😜</h3>
                        <Button color={"red"}
                            onClick={() => setConfirmationOpened(false)}
                            style={{ margin: "3px" }}
                        >
                            Annuler
                        </Button>
                        <Button
                            variant={"gradient"}
                            gradient={{ from: "#6eedb8", to: "#76b951", deg: 35 }}
                            onClick={() => donate()}>
                            Confirmer
                        </Button>
                    </div>
                </Modal>
            </Container>
        </>
    );
}

export default Donation;

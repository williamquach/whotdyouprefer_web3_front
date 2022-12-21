import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Burger, Button, Center, Container, createStyles, Group, Header, Paper, Transition } from "@mantine/core";
import { HeaderProps } from "./header-props";
import logo from "../../../logo.svg";
import "./AppHeader.css";
import { useNavigate } from "react-router-dom";
import { navigateTo } from "../../../utils/redirect.util";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
    dropdown: {
        position: "absolute",
        top: HEADER_HEIGHT,
        left: 0,
        right: 0,
        zIndex: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
        overflow: "hidden",

        [theme.fn.largerThan("xs")]: {
            display: "none"
        }
    },

    header: {
        display: "flex",
        // justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        marginLeft: 0
    },

    links: {
        [theme.fn.smallerThan("xs")]: {
            display: "none"
        }
    },

    burger: {
        [theme.fn.largerThan("xs")]: {
            display: "none"
        }
    },

    link: {
        display: "block !important",
        lineHeight: 1,
        padding: "8px 12px !important",
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        textAlign: "center",
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,


        "&:hover": {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]
        },

        [theme.fn.smallerThan("sm")]: {
            borderRadius: 0,
            padding: theme.spacing.md
        }
    },

    linkActive: {
        "&, &:hover": {
            backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color
        }
    }
}));


export function AppHeader({ links }: HeaderProps) {
    const [opened, { toggle }] = useDisclosure(false);
    const foundCurrentLink = links.find((link) => link.link === window.location.pathname);
    const [active, setActive] = useState(foundCurrentLink?.link);
    const navigate = useNavigate();
    const { classes, cx } = useStyles();

    const items = links.map((link) => (
        <Button
            key={link.label}
            className={cx(classes.link, { [classes.linkActive]: active === link.link })}
            onClick={(event) => {
                event.preventDefault();
                navigateTo(link.link, navigate);
                setActive(link.link);
            }}
            variant={active === link.link ? "light" : "subtle"}
            style={active === link.link ? {
                color: "black",
                fontWeight: "bold",
                backgroundColor: "rgba(255,255,255,0.7)"
            } : {}}
        >
            {link.label}
        </Button>
    ));

    return (
        // <Header height={HEADER_HEIGHT} mb={120} className={classes.root}>
        <Header height={HEADER_HEIGHT} mb={120} className={"App-Header"}>
            <Container className={classes.header}>
                <Center>
                    <Button variant="light" style={{ backgroundColor: "transparent", color: "black" }} uppercase
                        onClick={() => navigateTo("/", navigate)}>
                        <img src={logo} alt="whotdyouprefer logo" width={40} height={40} style={{ marginRight: 10 }} />
                        <strong>whotdyouprefer</strong>
                    </Button>
                </Center>
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>


                <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

                <Transition transition="pop-top-right" duration={200} mounted={opened}>
                    {(styles) => (
                        <Paper className={classes.dropdown} withBorder style={styles}>
                            {items}
                        </Paper>
                    )}
                </Transition>
            </Container>
        </Header>
    );
}

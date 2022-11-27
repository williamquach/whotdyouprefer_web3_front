import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Burger, Center, Container, createStyles, Group, Header } from "@mantine/core";
import { HeaderProps } from "./header-props";
import logo from "../../../logo.svg";
import "./AppHeader.css";

const useStyles = createStyles((theme) => ({
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%"
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
        display: "block",
        lineHeight: 1,
        padding: "8px 12px",
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        "&:hover": {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]
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
    const [active, setActive] = useState(links[0].link);
    const { classes, cx } = useStyles();

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={cx(classes.link, { [classes.linkActive]: active === link.link })}
            onClick={(event) => {
                event.preventDefault();
                setActive(link.link);
            }}
        >
            {link.label}
        </a>
    ));

    return (
        <Header height={60} mb={120} className={"App-Header"}>
            <Container className={classes.header}>
                <Center>
                    <img src={logo} alt="whotdyouprefer logo" width={40} height={40} />
                    <strong>whotdyouprefer</strong>
                </Center>
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>

                <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
            </Container>
        </Header>
    );
}

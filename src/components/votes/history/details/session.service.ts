import { SessionClosed } from "../../../../models/sessions/session-closed.model";

export function findClosedSessionById(id: number): SessionClosed {
    return {
        sessionId: id,
        label: "Meilleure Pizza",
        description: "Quel est la meilleure pizza de la VIE ?",
        expiresAt: new Date("2023-01-01 00:00:00"),
        userChoiceId: 2,
        choices: [
            {
                id: 1,
                label: "Pizza 4 fromages",
                rank: 3,
                votesCount: 2392
            },
            {
                id: 2,
                label: "Pizza 4 saisons",
                rank: 1,
                votesCount: 12039
            },
            {
                id: 3,
                label: "Pizza 4 saisons",
                rank: 2,
                votesCount: 10392
            },
            {
                id: 4,
                label: "Pizza 4 saisons",
                rank: 4,
                votesCount: 1239
            }
        ]
    };
}
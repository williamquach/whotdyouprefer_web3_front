import { Session } from "../../../../models/sessions/session.model";

export function findSessionById(id: number): Session {
    return {
        sessionId: id,
        label: "Meilleure Pizza",
        description: "Quel est la meilleure pizza de la VIE ?",
        expiresAt: new Date("2023-01-01 00:00:00")
    };
}
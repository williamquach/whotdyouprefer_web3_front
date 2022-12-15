import { SessionChoice } from "./session-choice.model";

export class Session {
    constructor(
        public sessionId: number,
        public label: string,
        public expiresAt: Date,
        public description?: string,
        public choices: SessionChoice[] = []
    ) {
    }
}

export const orderSessionsFromNewestToOldest = (sessions: Session[]): Session[] => {
    return sessions.sort((a, b) => b.expiresAt.getTime() - a.expiresAt.getTime());
};
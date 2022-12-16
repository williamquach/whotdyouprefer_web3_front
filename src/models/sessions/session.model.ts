import { SessionChoice } from "./session-choice.model";
import { SessionVote } from "./session-vote.model";

export class Session {
    constructor(
        public sessionId: number,
        public label: string,
        public expiresAt: Date,
        public description?: string,
        public choices: SessionChoice[] = [],
        public hasVoted: boolean = false,
        public vote: SessionVote = { choiceIds: [], sessionId: -1 }
    ) {
    }
}

export const orderSessionsFromNewestToOldest = (sessions: Session[]): Session[] => {
    return sessions.sort((a, b) => b.expiresAt.getTime() - a.expiresAt.getTime());
};
import { Session } from "./session.model";
import { SessionVote } from "./session-vote.model";

export class SessionClosed {
    constructor(
        public session: Session,
        public result: number[][],
        public choiceIdWinners: number[],
        public choiceIds: number[],
        public votes: SessionVote[]
    ) {

    }
}

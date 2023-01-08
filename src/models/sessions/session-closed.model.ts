import { Session } from "./session.model";

export class SessionClosed {
    constructor(
        public session: Session,
        public result: number[][],
        public choiceIdWinner: number
    ) {
    }
}

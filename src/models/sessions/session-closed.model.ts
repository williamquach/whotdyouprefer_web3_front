import { SessionClosedChoice } from "./session-closed-choice.model";

export class SessionClosed {
    constructor(
    public sessionId: number,
    public label: string,
    public expiresAt: Date,
    public userChoiceId: number,
    public choices: SessionClosedChoice[] = [],
    public description?: string
    ) {
    }
}

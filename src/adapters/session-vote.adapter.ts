import { SessionVote } from "../models/sessions/session-vote.model";
import { ContractSessionVote } from "../models/sessions/from-contract/contract-session-vote.dto";

export class SessionVoteAdapter {
    static contractToDomain(contractSession: ContractSessionVote): SessionVote {
        return new SessionVote(
            contractSession.choiceIds,
            contractSession.sessionId
        );
    }
}
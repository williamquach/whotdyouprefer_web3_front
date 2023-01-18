import { SessionClosed } from "../models/sessions/session-closed.model";
import { SessionAdapter } from "./session.adapter";
import { SessionVoteAdapter } from "./session-vote.adapter";
import { SessionWithResults } from "../models/sessions/from-contract/session-with-results.dto";

export class SessionClosedAdapter {
    static contractToDomain(contractSession: SessionWithResults): SessionClosed {
        return new SessionClosed(
            SessionAdapter.findByIdContractSessionToDomain(contractSession.session),
            contractSession.result,
            contractSession.choiceIdWinners,
            contractSession.choiceIds,
            contractSession.votes.map(SessionVoteAdapter.contractToDomain)
        );
    }
}
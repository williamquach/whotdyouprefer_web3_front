import { ContractSessionWithChoices } from "../models/sessions/from-contract/contract-session-with-choices.dto";
import { Session } from "../models/sessions/session.model";
import { FindByIdContractSession } from "../models/sessions/from-contract/find-by-id-contract-session.dto";
import { SessionChoiceAdapter } from "./session-choice.adapter";
import { SessionVoteAdapter } from "./session-vote.adapter";

export class SessionAdapter {
    static contractToDomain(contractSession: ContractSessionWithChoices): Session {
        return new Session(
            contractSession.session.sessionId,
            contractSession.session.label,
            new Date(parseInt(contractSession.session.endDateTime._hex, 16) * 1000),
            contractSession.session.description
        );
    }

    static findByIdContractSessionToDomain(contractSession: FindByIdContractSession): Session {
        return new Session(
            contractSession.session.sessionId,
            contractSession.session.label,
            new Date(parseInt(contractSession.session.endDateTime._hex, 16) * 1000),
            contractSession.session.description,
            contractSession.choices.map(choice => SessionChoiceAdapter.contractToDomain(choice)),
            contractSession.hasVoted,
            SessionVoteAdapter.contractToDomain(contractSession.vote)
        );
    }
}
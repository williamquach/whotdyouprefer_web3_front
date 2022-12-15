import { ContractSession } from "../models/sessions/from-contract/contract-session.dto";
import { Session } from "../models/sessions/session.model";
import { FindByIdContractSession } from "../models/sessions/from-contract/find-by-id-contract-session.dto";
import { SessionChoiceAdapter } from "./session-choice.adapter";

export class SessionAdapter {
    static contractToDomain(contractSession: ContractSession): Session {
        return {
            sessionId: contractSession.sessionId,
            label: contractSession.label,
            description: contractSession.description,
            expiresAt: new Date(parseInt(contractSession.endDateTime._hex, 16) * 1000),
            choices: []
        };
    }

    static findByIdContractSessionToDomain(contractSession: FindByIdContractSession): Session {
        return {
            sessionId: contractSession.session.sessionId,
            label: contractSession.session.label,
            description: contractSession.session.description,
            expiresAt: new Date(parseInt(contractSession.session.endDateTime._hex, 16) * 1000),
            choices: contractSession.choices.map(choice => SessionChoiceAdapter.contractToDomain(choice))
        };
    }
}
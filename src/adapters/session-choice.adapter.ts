import { ContractSessionChoice } from "../models/sessions/from-contract/contract-session-choice.dto";
import { SessionChoice } from "../models/sessions/session-choice.model";

export class SessionChoiceAdapter {
    static contractToDomain(contractSession: ContractSessionChoice): SessionChoice {
        return {
            label: contractSession.label,
            id: contractSession.choiceId
        };
    }
}
import { ContractSession } from "./contract-session.dto";
import { ContractSessionChoice } from "./contract-session-choice.dto";

export class ContractSessionWithChoices {
    constructor(
        public session: ContractSession,
        public choices: ContractSessionChoice[],
        public hasVoted: boolean
    ) {
    }
}


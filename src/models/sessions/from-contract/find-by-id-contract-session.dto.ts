import { ContractSession } from "./contract-session.dto";
import { ContractSessionChoice } from "./contract-session-choice.dto";

export class FindByIdContractSession {
    constructor(
        public session: ContractSession,
        public choices: ContractSessionChoice[]
    ) {
    }
}


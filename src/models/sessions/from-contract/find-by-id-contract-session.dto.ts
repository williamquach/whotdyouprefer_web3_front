import { ContractSessionChoice } from "./contract-session-choice.dto";
import { ContractSession } from "./contract-session.dto";
import { ContractSessionVote } from "./contract-session-vote.dto";

export class FindByIdContractSession {
    constructor(
        public session: ContractSession,
        public choices: ContractSessionChoice[],
        public hasVoted: boolean,
        public vote: ContractSessionVote
    ) {
    }
}


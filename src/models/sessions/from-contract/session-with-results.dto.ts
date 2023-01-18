import { ContractSessionVote } from "./contract-session-vote.dto";
import { FindByIdContractSession } from "./find-by-id-contract-session.dto";

export class SessionWithResults {
    constructor(
        public session: FindByIdContractSession,
        public result: number[][],
        public choiceIdWinners: number[],
        public choiceIds: number[],
        public votes: ContractSessionVote[]
    ) {
    }
}


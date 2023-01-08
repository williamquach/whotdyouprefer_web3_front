import { FindByIdContractSession } from "./find-by-id-contract-session.dto";

export class FindClosedByIdContractSession {
    constructor(
        public session: FindByIdContractSession,
        public result: number[][],
        public choiceIdWinner: number
    ) {
    }
}


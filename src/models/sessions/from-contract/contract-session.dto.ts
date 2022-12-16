export class ContractSession {
    constructor(
        public sessionId: number,
        public label: string,
        public description: string = "",
        public endDateTime: any
    ) {
    }
}


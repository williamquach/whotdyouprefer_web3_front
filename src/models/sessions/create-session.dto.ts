export class CreateSession {
    constructor(
        public label: string,
        public description: string = "",
        public expiresAt: Date,
        public choices: string[]
    ) {
    }
}


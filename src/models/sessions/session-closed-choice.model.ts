export class SessionClosedChoice {
    constructor(
        public id: number,
        public label: string,
        public votesCount: number, // TODO -> votesCount is the number of vote by preferences by users, e.g. Pref 1 : 123 votes, Pref 2: 8712 votes etc...
        public rank: number
    ) {
    }
}

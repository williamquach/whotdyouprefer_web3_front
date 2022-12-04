export class SessionChoice {
    constructor(
    public id: number,
    public label: string
    ) {
    }
}


export const orderSessionChoicesByIdAsc = (sessions: SessionChoice[]): SessionChoice[] => {
    return sessions.sort((a, b) => a.id - b.id);
};
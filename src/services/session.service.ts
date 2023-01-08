import { Session } from "../models/sessions/session.model";
import { Contract } from "ethers";
import { CreateSession } from "../models/sessions/create-session.dto";
import { SessionAdapter } from "../adapters/session.adapter";
import { SessionClosed } from "../models/sessions/session-closed.model";

export class SessionService {

    static async getOpenedSessions(contract: Contract): Promise<Session[]> {
        const openedSessions = await contract.getOpenedSessionsForSender();
        return openedSessions.map(SessionAdapter.contractToDomain);
    }

    static async getClosedSessionsWhereSenderHasVoted(contract: Contract): Promise<Session[]> {
        const closedSessions = await contract.getClosedSessionsWhereSenderHasVoted();
        console.log("Closed sessions where sender has voted", closedSessions);
        return closedSessions.map(SessionAdapter.contractToDomain);
    }

    static async getClosedSessionsWhereSenderIsCreator(contract: Contract): Promise<Session[]> {
        const closedSessions = await contract.getClosedSessionsWhereSenderIsCreator();
        console.log("Closed sessions where sender is creator", closedSessions);
        return closedSessions.map(SessionAdapter.contractToDomain);
    }

    static async createSession(contract: Contract, createSession: CreateSession): Promise<void> {
        const roundedEndDate = Math.round(createSession.expiresAt.getTime() / 1000);
        await contract.createSession(createSession.label, createSession.description, roundedEndDate, createSession.choices);
    }

    static async findSessionById(contract: Contract, sessionId: number): Promise<Session> {
        const session = await contract.getSessionForSender(sessionId);
        return SessionAdapter.findByIdContractSessionToDomain(session);
    }

    static async findClosedSessionById(contract: Contract, sessionId: number): Promise<SessionClosed | undefined> {
        try {
            const getWinnerBySessionId = await contract.getWinnerBySessionId(sessionId);
            console.log("getWinnerBySessionId", getWinnerBySessionId);
            return SessionAdapter.findClosedSessionByIdContractSessionToDomain(getWinnerBySessionId);
        } catch (e) {
            console.log(`Error when getting winner for session id ${sessionId}`, e);
            return undefined;
        }
    }

    static async vote(contract: Contract, sessionId: number, preferences: number[]): Promise<void> {
        await contract.createVote(sessionId, preferences);
    }
}
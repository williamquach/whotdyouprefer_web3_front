import { Session } from "../models/sessions/session.model";
import { Contract } from "ethers";
import { CreateSession } from "../models/sessions/create-session.dto";
import { SessionAdapter } from "../adapters/session.adapter";

export class SessionService {
    private static contract: Contract;

    static async getOpenedSessions(contract: Contract): Promise<Session[]> {
        const openedSessions = await contract.getOpenedSessionsForOwner();
        return openedSessions.map(SessionAdapter.contractToDomain);
    }

    static async getClosedSessions(contract: Contract): Promise<Session[]> {
        const closedSessions = await contract.getOwnerHistory();
        return closedSessions.map(SessionAdapter.contractToDomain);
    }

    static async createSession(contract: Contract, createSession: CreateSession): Promise<void> {
        const roundedEndDate = Math.round(createSession.expiresAt.getTime() / 1000);
        await contract.createSession(createSession.label, createSession.description, roundedEndDate, createSession.choices);
    }

    static async findSessionById(contract: Contract, sessionId: number): Promise<Session> {
        const session = await contract.getSessionForOwner(sessionId);
        return SessionAdapter.findByIdContractSessionToDomain(session);
    }

    static async vote(contract: Contract, sessionId: number, preferences: number[]): Promise<void> {
        await contract.createVote(sessionId, preferences);
    }
}
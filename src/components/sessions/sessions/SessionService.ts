import { Session } from "../../../models/sessions/session.model";
import { Contract } from "ethers";

export class SessionService {
    static async getOpenedSessions(readContract: Contract): Promise<Session[]> {
        const openedSessions = await readContract.getOpenedSessions();
        console.log("Open sessions in Session Service: ", openedSessions);
        return [];
    }

    static async getClosedSessions(readContract: Contract): Promise<Session[]> {
        const closedSessions = await readContract.getOwnerHistory();
        console.log("Closed sessions in Session Service: ", closedSessions);
        return [];
    }
}
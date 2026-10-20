import { randomUUID } from "crypto";
import { histories } from "../data/history/history.data";
import { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { errorService } from "../interfaces/error/errorService";
import { successService } from "../interfaces/error/SuccessService";
import { HistoryBD } from "../interfaces/history/historyBD";
import { isValidHistory } from "../validators/historyValidator";
import { createSuccessService } from "../interfaces/error/createSuccessService";
import { History } from "../interfaces/history/history";

export async function getAllHistories(): Promise<HistoryBD[]> {
    return histories;
}

export async function getHistoryById(id: string): Promise<HistoryBD | undefined> {

    return histories.find(
        (c: HistoryBD) => { return c.id === id }
    );

}

export async function createHistory(history: History): Promise<successService<HistoryBD> | errorService> {



    if (!isValidHistory(history)) {
        return { success: false, code: 400, message: "fuck you" };
    }

    // les correctes son dades
    const uuid: string = randomUUID();

    const historyRecord: HistoryBD = {
        id: uuid,
        user: history.user.trim().replace(/\s+/g, " "),
        track: history.track.trim().replace(/\s+/g, " "),
        data: new Date(),

    };
    histories.push(historyRecord);

    return { success: true, data: historyRecord, code: 201 };


}

export async function putHistory(history: HistoryBD, id: string | string[]): Promise<createSuccessService<HistoryBD> | errorService> {
    if (!isValidHistory(history)) {
        return { success: false, code: 400, message: "adeu" };
    }


    const index: number = histories.findIndex(
        (t: HistoryBD) => { return t.id === id }
    );

    if (index === -1) {
        return { success: false, code: 404, message: `Pais invalid, com tu.` };
    }

    const historyBD: HistoryBD = {
        id: id as string,
        user: history.user.trim().replace(/\s+/g, " "),
        track: history.track.trim().replace(/\s+/g, " "),
        data: new Date(),

    };

    return { success: true, data: historyBD, code: 201, index: index };
}

export async function deleteHistory(id: string | string[]): Promise<deleteSuccessService | errorService> {

    const index: number = histories.findIndex(
        (t: HistoryBD) => { return t.id === id }
    );
    if (index === -1) {
        return { success: false, code: 404, message: `History ${id} not found lol` };
    }

    return { success: true, code: 204, index: index }

}

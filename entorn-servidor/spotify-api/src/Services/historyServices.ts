import sql, { ConnectionPool, IResult, UniqueIdentifier } from "mssql";
import { getConnection } from "../config/database";
import { createSuccessService } from "../interfaces/error/createSuccessService";
import { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { selectSuccessService } from "../interfaces/error/selectSuccesService";
import { updateSuccessService } from "../interfaces/error/updateSuccessService";
import { errorService } from "../interfaces/error/errorService";
import { History } from "../interfaces/History/history";
import { HistoryBD } from "../interfaces/History/historyBD";
import { isValidHistory } from "../validators/historyValidator";

export async function getAllHistories(): Promise<HistoryBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const result: IResult<HistoryBD> = await request.query(`SELECT * FROM History`);
    return result.recordset;
}

export async function getHistoryById(idHistory: string): Promise<selectSuccessService<HistoryBD> | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", UniqueIdentifier, idHistory);

    const result: IResult<HistoryBD> = await request.query(`SELECT * FROM History WHERE History.id = @id`);

    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "History not found"
        };
    }

    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    };
}

export async function createHistory(history: HistoryBD): Promise<createSuccessService | errorService> {
    if (!isValidHistory(history)) {
        return { success: false, code: 400, message: "Invalid history data." };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText = `INSERT INTO History(user_id, track_id, [date]) VALUES (@user_id, @track_id, @date)`;

    request.input("user_id", UniqueIdentifier, history.user);
    request.input("track_id", UniqueIdentifier, history.track);
    request.input("date", sql.DateTime2, history.data);

    const result: IResult<number> = await request.query(queryText);

    return {
        success: true,
        code: 201,
        data: result.rowsAffected[0]
    };
}


export async function deleteHistory(idHistory: string): Promise<deleteSuccessService | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", UniqueIdentifier, idHistory);

    const result: IResult<HistoryBD> = await request.query(`DELETE FROM History WHERE History.id = @id`);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "History not found"
        };
    }

    return {
        success: true,
        code: 204
    };
}

export async function addTrackUserHistory(historyTrack: History): Promise<createSuccessService | errorService> {
    if (!isValidHistory(historyTrack)) {
        return { success: false, code: 400, message: "Invalid data." };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `INSERT INTO History(user_id, track_id) VALUES(@user_id,@track_id)`;

    request.input("user_id", sql.UniqueIdentifier, historyTrack.user);
    request.input("track_id", sql.UniqueIdentifier, historyTrack.track);                                                                                     

    const result: IResult<number> = await request.query(queryText);
    return {
        success: true,
        code: 201,
        data: result.rowsAffected[0]
    };
}
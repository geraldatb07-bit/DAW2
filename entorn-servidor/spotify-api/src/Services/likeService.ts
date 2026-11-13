import sql, { ConnectionPool, IResult, UniqueIdentifier } from "mssql";
import { getConnection } from "../config/database";
import { createSuccessService } from "../interfaces/error/createSuccessService";
import { errorService } from "../interfaces/error/errorService";
import { Like } from "../interfaces/Likes/like";
import { isValidLike } from "../validators/likeValidator";

export async function createLike(like: Like): Promise<createSuccessService | errorService> {
    if (!isValidLike(like)) {
        return { success: false, code: 400, message: "Invalid like data." };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText = `INSERT INTO Likes(id, user_id, track_id, [date], likeTrack) VALUES (NEWID(), @user_id, @track_id, SYSDATETIME(), 1)`;

    request.input("user_id", UniqueIdentifier, like.user);
    request.input("track_id", UniqueIdentifier, like.track);

    const result: IResult<number> = await request.query(queryText);

    return {
        success: true,
        code: 201,
        data: result.rowsAffected[0]
    };
}
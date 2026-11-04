import sql, { ConnectionPool, IResult, UniqueIdentifier } from "mssql";
import { getConnection } from "../config/database";
import { createSuccessService } from "../interfaces/error/createSuccessService";
import { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { errorService } from "../interfaces/error/errorService";
import { selectSuccessService } from "../interfaces/error/selectSuccesService";
import { updateSuccessService } from "../interfaces/error/updateSuccessService";
import type { Playlist } from "../interfaces/Playlist/playlist";
import type { PlaylistBD } from "../interfaces/Playlist/playlistBD";
import { isValidPlaylist } from "../validators/playlist.validator";

export async function getAllPlaylists(): Promise<PlaylistBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const result: IResult<PlaylistBD> = await request.query(`SELECT * FROM Playlist`);
    return result.recordset;
}

export async function getPlaylistById(idPlaylist: string): Promise<selectSuccessService<PlaylistBD> | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", UniqueIdentifier, idPlaylist);

    const result: IResult<PlaylistBD> = await request.query(`SELECT * FROM Playlist WHERE Playlist.id = @id`);

    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "Playlist not found"
        };
    }

    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    };
}

export async function createPlaylist(playlist: Playlist): Promise<createSuccessService<number> | errorService> {
    if (!isValidPlaylist(playlist)) {
        return { success: false, code: 400, message: "Invalid playlist data." };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    request.input("email", sql.NVarChar, playlist.user.email);
    const userQuery = await request.query(`SELECT id FROM [User] WHERE email = @email`);

    if (userQuery.recordset.length === 0) {
        return { success: false, code: 404, message: "User not found" };
    }

    const userId = userQuery.recordset[0].id;
    const queryText = `INSERT INTO Playlist(title, user_id) VALUES (@title, @user_id)`;

    request.input("title", sql.NVarChar, playlist.title.trim().replace(/\s+/g, " "));
    request.input("user_id", UniqueIdentifier, userId);

    const result: IResult<number> = await request.query(queryText);

    return {
        success: true,
        code: 201,
        data: result.rowsAffected[0]
    };
}

export async function updatePlaylist(idPlaylist: string, playlist: Playlist): Promise<updateSuccessService<number> | errorService> {
    if (!isValidPlaylist(playlist)) {
        return {
            success: false,
            code: 400,
            message: "Invalid playlist data."
        };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("email", sql.NVarChar, playlist.user.email);
    const userQuery = await request.query(`SELECT id FROM [User] WHERE email = @email`);

    if (userQuery.recordset.length === 0) {
        return { success: false, code: 404, message: "User not found" };
    }

    const userId = userQuery.recordset[0].id;
    const queryText = `UPDATE Playlist SET title=@title, user_id=@user_id WHERE id=@id`;

    request.input("title", sql.NVarChar, playlist.title.trim().replace(/\s+/g, " "));
    request.input("user_id", UniqueIdentifier, userId);
    request.input("id", UniqueIdentifier, idPlaylist);

    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Playlist not found"
        };
    }

    return {
        success: true,
        code: 200,
        data: result.rowsAffected[0]
    };
}

export async function deletePlaylist(idPlaylist: string): Promise<deleteSuccessService | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", UniqueIdentifier, idPlaylist);

    const result: IResult<PlaylistBD> = await request.query(`DELETE FROM Playlist WHERE Playlist.id = @id`);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Playlist not found"
        };
    }

    return {
        success: true,
        code: 204
    };
}

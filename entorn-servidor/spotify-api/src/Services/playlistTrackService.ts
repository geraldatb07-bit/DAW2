import sql, { ConnectionPool, IResult, UniqueIdentifier } from "mssql";
import { getConnection } from "../config/database";
import { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { errorService } from "../interfaces/error/errorService";
import { selectSuccessService } from "../interfaces/error/selectSuccesService";
import type { PlaylistTrackBD } from "../interfaces/playlistTrack/playlistTracksBD";

export async function getAllPlaylistTracks(): Promise<PlaylistTrackBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const result: IResult<PlaylistTrackBD> = await request.query(`SELECT * FROM PlaylistTracks`);
    return result.recordset;
}

export async function getPlaylistTrackById(idPlaylistTrack: string): Promise<selectSuccessService<PlaylistTrackBD> | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", UniqueIdentifier, idPlaylistTrack);

    const result: IResult<PlaylistTrackBD> = await request.query(`SELECT * FROM PlaylistTracks WHERE PlaylistTracks.id = @id`);

    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "PlaylistTrack not found"
        };
    }

    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    };
}

export async function createPlaylistTrack(playlistTrack: { playlistId: string; trackId: string }): Promise<{ success: boolean; code: number; data: number } | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText = `INSERT INTO PlaylistTracks(playlist_id, track_id) VALUES (@playlist_id, @track_id)`;

    request.input("playlist_id", UniqueIdentifier, playlistTrack.playlistId);
    request.input("track_id", UniqueIdentifier, playlistTrack.trackId);

    const result: IResult<number> = await request.query(queryText);
    return {
        success: true,
        code: 201,
        data: result.rowsAffected[0]
    };
}

export async function deletePlaylistTrack(idPlaylistTrack: string): Promise<deleteSuccessService | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", UniqueIdentifier, idPlaylistTrack);

    const result: IResult<PlaylistTrackBD> = await request.query(`DELETE FROM PlaylistTracks WHERE id = @id`);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "PlaylistTrack not found"
        };
    }

    return {
        success: true,
        code: 204
    };
}

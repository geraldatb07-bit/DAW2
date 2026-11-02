import sql, { ConnectionPool, IResult, UniqueIdentifier } from "mssql";
import { getConnection } from "../config/database";
import { createSuccessService } from "../interfaces/error/createSuccessService";
import { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { errorService } from "../interfaces/error/errorService";
import { selectSuccessService } from "../interfaces/error/selectSuccesService";
import { AlbumTrack } from "../interfaces/albumTracks/albumTracks";
import { AlbumTrackBD } from "../interfaces/albumTracks/albumTracksBD";
import { isValidAlbumTrack } from "../validators/albumTrack.validator";

export async function getAllAlbumTracks(): Promise<AlbumTrackBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const result: IResult<AlbumTrackBD> = await request.query(`SELECT * FROM AlbumTracks`);
    return result.recordset;
}

export async function getAlbumTrackById(idAlbumTrack: string): Promise<selectSuccessService<AlbumTrackBD> | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", UniqueIdentifier, idAlbumTrack);

    const result: IResult<AlbumTrackBD> = await request.query(`SELECT * FROM AlbumTracks WHERE AlbumTracks.id = @id`);

    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "AlbumTrack not found"
        };
    }

    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    };
}

export async function createAlbumTrack(albumTrack: AlbumTrack): Promise<createSuccessService<number> | errorService> {
    if (!isValidAlbumTrack(albumTrack)) {
        return { success: false, code: 400, message: "Invalid album track data." };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText = `INSERT INTO AlbumTracks(album_id, track_id) VALUES (@album_id, @track_id)`;

    request.input("album_id", UniqueIdentifier, albumTrack.album);
    request.input("track_id", UniqueIdentifier, albumTrack.track);

    const result: IResult<number> = await request.query(queryText);
    return {
        success: true,
        code: 201,
        data: result.rowsAffected[0]
    };
}

export async function deleteAlbumTrack(idAlbumTrack: string): Promise<deleteSuccessService | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", UniqueIdentifier, idAlbumTrack);

    const result: IResult<AlbumTrackBD> = await request.query(`DELETE FROM AlbumTracks WHERE AlbumTracks.id = @id`);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "AlbumTrack not found"
        };
    }

    return {
        success: true,
        code: 204
    };
}

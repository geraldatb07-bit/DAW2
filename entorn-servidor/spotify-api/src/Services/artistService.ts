import type { Artist } from "../interfaces/artist/artist";
import type { ArtistBD } from "../interfaces/artist/artistBD";
import { isValidArtist } from "../validators/artist.validator";
import type { createSuccessService } from "../interfaces/error/createSuccessService";
import type { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import type { errorService } from "../interfaces/error/errorService";
import type { selectSuccessService } from "../interfaces/error/selectSuccesService";
import type { updateSuccessService } from "../interfaces/error/updateSuccessService";
import { ConnectionPool, IResult, UniqueIdentifier } from "mssql";
import { getConnection } from "../config/database";
import sql from "mssql";

export async function getAllArtist(): Promise<ArtistBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from Artist`;
    const result: IResult<ArtistBD> = await request.query(queryText);
    return result.recordset;
}

export async function getArtistById(idArtist: string): Promise<selectSuccessService<ArtistBD> | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from Artist Where Artist.id=@id`;
    request.input("id", UniqueIdentifier, idArtist);

    const result: IResult<ArtistBD> = await request.query(queryText);

    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "Artist not found"
        };
    }

    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    };
}

export async function createArtist(artist: Artist): Promise<createSuccessService<number> | errorService> {
    if (!isValidArtist(artist)) {
        return { success: false, code: 400, message: "Invalid data." };
    }

    const nom: string = artist.nom.trim().replace(/\s+/g, " ");
    const pseudonim: string = artist.pseudonim.trim().replace(/\s+/g, " ");

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `INSERT INTO Artist(name,pseudonym,country_id)
        VALUES(@name,@pseudonym,(SELECT id FROM Country WHERE name=@country))`;

    request.input("name", sql.NVarChar, nom);
    request.input("pseudonym", sql.NVarChar, pseudonim);
    request.input("country", sql.NVarChar, artist.pais.countryName);

    const result: IResult<number> = await request.query(queryText);

    return {
        success: true,
        code: 201,
        data: result.rowsAffected[0]
    };
}

export async function updateArtist(artist: Artist,idArtist: string): Promise<updateSuccessService<number> | errorService> {
    if (!isValidArtist(artist)) {
        return {
            success: false,
            code: 400,
            message: "Invalid data."
        };
    }

    const nom: string = artist.nom.trim().replace(/\s+/g, " ");
    const pseudonim: string = artist.pseudonim.trim().replace(/\s+/g, " ");

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `UPDATE Artist
        SET name=@name,pseudonym=@pseudonym,
            country_id=(SELECT id FROM Country WHERE name=@country)
        WHERE Artist.id=@id`;

    request.input("name", sql.NVarChar, nom);
    request.input("pseudonym", sql.NVarChar, pseudonim);
    request.input("country", sql.NVarChar, artist.pais.countryName);
    request.input("id", UniqueIdentifier, idArtist);

    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Artist not found"
        };
    }

    return {
        success: true,
        code: 200,
        data: result.rowsAffected[0]
    };
}

export async function deleteArtist(idArtist: string): Promise<deleteSuccessService | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Delete from Artist Where Artist.id=@id`;
    request.input("id", UniqueIdentifier, idArtist);

    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Artist not found"
        };
    }

    return {
        success: true,
        code: 204
    };
}

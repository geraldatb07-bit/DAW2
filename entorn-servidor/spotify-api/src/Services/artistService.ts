import sql, { ConnectionPool, IResult, UniqueIdentifier } from "mssql";
import { getConnection } from "../config/database";
import { countries } from "../data/country/country.data";
import { createSuccessService } from "../interfaces/error/createSuccessService";
import { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { errorService } from "../interfaces/error/errorService";
import { selectSuccessService } from "../interfaces/error/selectSuccesService";
import { updateSuccessService } from "../interfaces/error/updateSuccessService";
import type { Artist } from "../interfaces/artist/artist";
import type { ArtistBD } from "../interfaces/artist/artistBD";
import { isValidArtist } from "../validators/artist.validator";

export async function getAllArtist(): Promise<ArtistBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const result: IResult<ArtistBD> = await request.query(`SELECT * FROM Artist`);
    return result.recordset;
}

export async function getArtistById(idArtist: string): Promise<selectSuccessService<ArtistBD> | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", UniqueIdentifier, idArtist);

    const result: IResult<ArtistBD> = await request.query(`SELECT * FROM Artist WHERE Artist.id = @id`);

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

export async function createArtist(artist: Artist): Promise<createSuccessService | errorService> {
    if(!isValidArtist(artist)) {
    return { success: false, code: 400, message: "Invalid artist data." };
}

const country = countries.find((c) => c.countryName.trim().toLowerCase() === artist.pais.countryName.trim().toLowerCase());
if (!country) {
    return { success: false, code: 404, message: "Country not found" };
}

const pool: ConnectionPool = await getConnection();
const request: sql.Request = pool.request();
const queryText = `INSERT INTO Artist(name, pseudonym, country_id) VALUES (@name, @pseudonym, @country_id)`;

request.input("name", sql.NVarChar, artist.nom.trim().replace(/\s+/g, " "));
request.input("pseudonym", sql.NVarChar, artist.pseudonim.trim().replace(/\s+/g, " "));
request.input("country_id", UniqueIdentifier, country.id);

const result: IResult<number> = await request.query(queryText);

return {
    success: true,
    code: 201,
    data: result.rowsAffected[0]
};
}

export async function updateArtist(idArtist: string, artist: Artist): Promise<updateSuccessService<number> | errorService> {
    if (!isValidArtist(artist)) {
        return {
            success: false,
            code: 400,
            message: "Invalid artist data."
        };
    }

    const country = countries.find((c) => c.countryName.trim().toLowerCase() === artist.pais.countryName.trim().toLowerCase());
    if (!country) {
        return { success: false, code: 404, message: "Country not found" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText = `UPDATE Artist SET name=@name, pseudonym=@pseudonym, country_id=@country_id WHERE id=@id`;

    request.input("name", sql.NVarChar, artist.nom.trim().replace(/\s+/g, " "));
    request.input("pseudonym", sql.NVarChar, artist.pseudonim.trim().replace(/\s+/g, " "));
    request.input("country_id", UniqueIdentifier, country.id);
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
    request.input("id", UniqueIdentifier, idArtist);

    const result: IResult<ArtistBD> = await request.query(`DELETE FROM Artist WHERE Artist.id = @id`);

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

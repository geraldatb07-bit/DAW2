import { randomUUID } from "crypto";
import type { Artist } from "../interfaces/artist/artist";
import type { ArtistBD } from "../interfaces/artist/artistBD";
import { isValidArtist } from "../validators/artist.validator";

import type { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { errorService } from "../interfaces/error/errorService";
import { artists } from "../data/artist/artist.data";
import { successService } from "../interfaces/error/SuccessService";
import sql, { ConnectionPool, IResult } from "mssql";
import { getConnection } from "../config/database";

interface ArtistDataRecord {
    id: string;
    nom: string;
    pseudonim: string;
    countryName: string;
}

export async function getAllArtist(): Promise<ArtistBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `
        SELECT a.id, a.name AS nom, COALESCE(a.pseudonym, '') AS pseudonim, c.name AS countryName
        FROM Artist AS a
        INNER JOIN Country AS c ON c.id = a.country_id`;
    const result: IResult<ArtistDataRecord> = await request.query(queryText);
    return result.recordset.map(({ id, nom, pseudonim, countryName }) => ({
        id,
        nom,
        pseudonim,
        pais: { countryName }
    }));
}

export function getArtistById(idArtist: string): ArtistBD | undefined {
    return artists.find(artist => artist.id === idArtist);
}

export function createArtist(artist: Artist): errorService | successService<ArtistBD> {
    if (!isValidArtist(artist)) {
        return { success: false, code: 400, message: "Invalid data." };
    }

    const artistRecord: ArtistBD = {
        id: randomUUID(),
        nom: artist.nom.trim().replace(/\s+/g, " "),
        pseudonim: artist.pseudonim.trim().replace(/\s+/g, " "),
        pais: artist.pais
    };

    artists.push(artistRecord);
    return { success: true, code: 201, data: artistRecord };
}

export function updateArtist(idArtist: string, artist: Artist): errorService | successService<ArtistBD> {
    if (!isValidArtist(artist)) {
        return { success: false, code: 400, message: "Invalid data." };
    }

    const index = artists.findIndex(item => item.id === idArtist);

    if (index === -1) {
        return { success: false, code: 404, message: `Artist ${idArtist} not found` };
    }

    const artistRecord: ArtistBD = {
        id: idArtist,
        nom: artist.nom.trim().replace(/\s+/g, " "),
        pseudonim: artist.pseudonim.trim().replace(/\s+/g, " "),
        pais: artist.pais
    };

    artists[index] = artistRecord;
    return { success: true, code: 200, data: artistRecord };
}

export function deleteArtist(idArtist: string): deleteSuccessService | errorService {
    const index = artists.findIndex(artist => artist.id === idArtist);

    if (index === -1) {
        return { success: false, code: 404, message: `Artist ${idArtist} not found` };
    }

    artists.splice(index, 1);
    return { success: true, code: 204 };
}
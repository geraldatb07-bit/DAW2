import { randomUUID } from "crypto";
import type { Artist } from "../../artist/artist";
import type { ArtistBD } from "../../artist/artistBD";
import { artists } from "../artist.data";
import { isValidArtist } from "../../../validators/artist.validador";
import type { ErrorService } from "../../error/errorService";
import type { createSuccessService } from "./createSucessService";
import type { updateSuccessService } from "./updateSuccessService";
import type { deleteSuccessService } from "./deleteSuccessService";

export function getAllArtist(): ArtistBD[] {
    return artists;
}

export function getArtistById(idArtist: string): ArtistBD | undefined {
    return artists.find(artist => artist.id === idArtist);
}

export function createArtist(artist: Artist): ErrorService | createSuccessService<ArtistBD> {
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

export function updateArtist(idArtist: string,artist: Artist): ErrorService | updateSuccessService<ArtistBD> {
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
    return { success: true, code: 200, data: artistRecord, index };
}

export function deleteArtist(idArtist: string): deleteSuccessService | ErrorService {
    const index = artists.findIndex(artist => artist.id === idArtist);

    if (index === -1) {
        return { success: false, code: 404, message: `Artist ${idArtist} not found` };
    }

    artists.splice(index, 1);
    return { success: true, code: 204, index };
}
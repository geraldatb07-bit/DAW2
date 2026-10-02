import { MAXPSEUDONIM, MAXNOMREAL } from "../interfaces/artist/artist.constants.js";
import { Artist } from "../interfaces/artist/artist.js";
import { PAISSOS } from "../interfaces/data/pais.data.js";
import { MAXARTIST, MAXTITOL } from "../interfaces/track/track.constants.js";

export function isValidArtist(artist: Artist): boolean | string | undefined {

    if (!artist.nom || !artist.pseudonim || !artist.pais) {
        return false;
    }

    const longPseudonim: number = artist.pseudonim.trim().replace(/\s+/g, " ").length;
    const longNom: number = artist.nom.trim().replace(/\s+/g, " ").length;

    if (longNom === 0 || longNom > MAXNOMREAL) { return false; }
    if (longPseudonim === 0 || longPseudonim > MAXPSEUDONIM) { return false; }

    const pais: string | undefined = PAISSOS.find((p: string) => { return p === artist.pais.toUpperCase() });
    if (!pais) { return false; }
    else { return true; }


}
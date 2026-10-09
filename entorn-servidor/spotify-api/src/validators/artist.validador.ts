import { MAXPSEUDONIM, MAXNOMREAL } from "../interfaces/artist/artist.constants";
import { Artist } from "../interfaces/artist/artist";
import { PAISSOS } from "../interfaces/data/pais.data";


export function isValidArtist(artist: Artist): boolean {

    if (!artist.nom || !artist.pseudonim || !artist.pais) {
        return false;
    }

    const longPseudonim: number = artist.pseudonim.trim().replace(/\s+/g, " ").length;
    const longNom: number = artist.nom.trim().replace(/\s+/g, " ").length;

    if (longNom === 0 || longNom > MAXNOMREAL) { return false; }
    if (longPseudonim === 0 || longPseudonim > MAXPSEUDONIM) { return false; }

    const pais: string | undefined = PAISSOS.find((p: string) => { return p === artist.pais.countryName.toUpperCase() });
    if (!pais) { return false; }
    else { return true; }
    
}
import { MAXPSEUDONIM, MAXNOMREAL } from "../interfaces/artist/artist.constants";
import { Artist } from "../interfaces/artist/artist";
import { countries } from "../data/country/country.data";

export function isValidArtist(artist: Artist): boolean {

    if (!artist) {
        return false;
    }
    if (!artist.pseudonim || !artist.nom || !artist.pais) {
        return false
    }

    const longPseudonim: number = artist.pseudonim.trim().replace(/\s+/g, "").length;
    const longNom: number = artist.nom.trim().replace(/\s+/g, "").length;

    const dadesOK: boolean = longPseudonim > 0
        && longPseudonim <= MAXPSEUDONIM
        && longNom > 0
        && longNom <= MAXNOMREAL

    if (!dadesOK) {
        return false;
    }

    const countryExists = countries.some((country) => country.id === artist.pais.id);
    if (!countryExists) {
        return false;
    }

    return true;
}
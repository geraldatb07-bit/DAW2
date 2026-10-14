import { countries } from "../data/country/country.data";
import { Artist } from "../interfaces/artist/artist";
import { MAXPSEUDONIM } from "../interfaces/artist/artist.constants";
import { CountryBD } from "../interfaces/Country/countryBD";
import { MAXARTIST } from "../interfaces/track/track.constants";



export function isValidArtist(artist: Artist): boolean | string | undefined {

    if (!artist) {
        return false;
    }
    if (!artist.nom || !artist.pseudonim || !artist.pais) {
        return false
    }

    const longArtist: number = artist.nom.trim().replace(/\s+/g, "").length;
    const longPseudonim: number = artist.pseudonim.trim().replace(/\s+/g, "").length;

    const dadesOK: boolean = longArtist > 0
        && longArtist <= MAXARTIST
        && longPseudonim > 0
        && longPseudonim <= MAXPSEUDONIM

    if (!dadesOK) {
        return false;
    }

    const countryExists: CountryBD | undefined = countries.find(
        (c: CountryBD) => { c.countryName.trim().toLowerCase() === artist.pais.countryName.trim().toLowerCase() }
    )
    if (!countryExists) {
        return false;
    }

    return true;
}
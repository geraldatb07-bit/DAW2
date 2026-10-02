"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidArtist = isValidArtist;
const artist_constants_js_1 = require("../interfaces/artist/artist.constants.js");
const pais_data_js_1 = require("../interfaces/data/pais.data.js");
function isValidArtist(artist) {
    if (!artist.nom || !artist.pseudonim || !artist.pais) {
        return false;
    }
    const longPseudonim = artist.pseudonim.trim().replace(/\s+/g, " ").length;
    const longNom = artist.nom.trim().replace(/\s+/g, " ").length;
    if (longNom === 0 || longNom > artist_constants_js_1.MAXNOMREAL) {
        return false;
    }
    if (longPseudonim === 0 || longPseudonim > artist_constants_js_1.MAXPSEUDONIM) {
        return false;
    }
    const pais = pais_data_js_1.PAISSOS.find((p) => { return p === artist.pais.toUpperCase(); });
    if (!pais) {
        return false;
    }
    else {
        return true;
    }
}

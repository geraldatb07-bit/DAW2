"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidTrack = isValidTrack;
const track_constants_js_1 = require("../interfaces/track/track.constants.js");
function isValidTrack(track) {
    if (track.artist === null || track.duration === null || track.title === null) {
        return false;
    }
    const longTitol = track.title.trim().replace(/\s+/g, " ").length;
    const longArtist = track.artist.trim().replace(/\s+/g, " ").length;
    if (longArtist === 0 || longArtist > track_constants_js_1.MAXARTIST) {
        return false;
    }
    if (longTitol === 0 || longTitol > track_constants_js_1.MAXTITOL) {
        return false;
    }
    if (track.duration < 1) {
        return false;
    }
    return true;
}

import { Track } from "../interfaces/data/track.js";
import { MAXARTIST, MAXTITOL } from "../interfaces/track/track.constants.js";

export function isValidTrack(track: Track): boolean {
  

    if (track.artist === null || track.duration === null || track.title === null) {
        return false;
    }

    const longTitol: number = track.title.trim().replace(/\s+/g, " ").length;
    const longArtist: number = track.artist.trim().replace(/\s+/g, " ").length;

    if (longArtist === 0 || longArtist > MAXARTIST) {return false;}
    if (longTitol === 0 || longTitol > MAXTITOL) { return false; }
    if(track.duration<1) {return false;}
    return true;

}
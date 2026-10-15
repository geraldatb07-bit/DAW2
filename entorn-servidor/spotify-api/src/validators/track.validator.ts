import { Track } from "../interfaces/track/track";
import { MAXARTIST, MAXTITOL } from "../interfaces/track/track.constants";


export function isValidTrack(track: Track): boolean {
    let correcte: boolean = true;

    if (!track.artist || !track.title || !track.duration) {
        return false
    }

    const longTitle: number = track.title.trim().replace(/\s+/g, "").length;
    const longArtist: number = track.title.trim().replace(/\s+/g, "").length;

    if (longArtist === 0 || longArtist > MAXARTIST) {
        return false;
    }
    if (longTitle === 0 || longTitle > MAXTITOL) {
        return false;
    }
    if (track.duration < 1) {
        return false;
    }



    if (track.artist.trim().length === 0 || track.title.trim().length === 0 || track.duration <= 0) {
        correcte = false;
    }
    return correcte
}
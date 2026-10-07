import { randomUUID } from "crypto";
import { tracks } from "../data/track/track.js";
import { isValidTrack } from "../validators/track.validator.js";
import type { TrackBD, TrackInput } from "../interfaces/track/trackBD.js";
import { Track } from "../interfaces/data/track.js";
import { ErrorService } from "../interfaces/error/errorService.js";
import { SuccessService } from "../interfaces/error/sucessService.js";
import { updateSuccessService } from "../interfaces/error/updateSuccessService.js";

export function getAllTracks(): TrackBD[] {
    return tracks;
}

export function getTrackById(idTrack: string): TrackBD | undefined {
    return tracks.find((track: TrackBD) => track.id === idTrack);
}

export function createTrack(track: Track): ErrorService | SuccessService<TrackBD> {

    if (!isValidTrack(track)) {
        return { success: false, code: 400, message: "Invalid data." }
    }

    const trackRecord: Track = {
        id: randomUUID(),
        title: track.title.trim().replace(/\s+/g, " "),
        artist: track.artist.trim().replace(/\s+/g, " "),
        duration: track.duration
    };

    return { success: true, code: 201, data: trackRecord }
}

export function updateTrack(idTrack: string, track: Track): ErrorService | updateSuccessService<TrackBD> {
    
    if (!isValidTrack(track)) {
        return { success: false, code: 400, message: "Invalid data." }
    }

    const index: number = tracks.findIndex((t: Track) => { return t.id === idTrack; });

    if (index === -1) {
        return { success: false, code: 404, message: `Track ${idTrack} not found` };
    }

    const trackBD: TrackBD = {
        id: idTrack,
        title: track.title.trim().replace(/\s+/g, " "),
        artist: track.artist.trim().replace(/\s+/g, " "),
        duration: track.duration
    };

    tracks[index] = trackBD;
    return { success: true, code: 200, data: trackBD }

}

export function getTrackIndex(idTrack: string): number {
    return tracks.findIndex((t: Track) => t.id === idTrack);
}
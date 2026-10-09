import { randomUUID } from "crypto";
import { tracks } from "../../../data/track/track";
import { isValidTrack } from "../../../validators/track.validator";
import type { TrackBD, TrackInput } from "../../track/trackBD";
import { Track } from "../track";
import { ErrorService } from "../../error/errorService";
import type { updateSuccessService } from "./updateSuccessService";
import type { deleteSuccessService } from "./deleteSuccessService";
import { createSuccessService } from "./createSucessService";

export function getAllTracks(): TrackBD[] {
    return tracks;
}

export function getTrackById(idTrack: string): TrackBD | undefined {
    return tracks.find((track: TrackBD) => track.id === idTrack);
}

export function createTrack(track: Track): ErrorService | createSuccessService<TrackBD> {
    if (!isValidTrack(track)) {
        return { success: false, code: 400, message: "Invalid data." };
    }

    const trackRecord: TrackBD = {
        id: randomUUID(),
        title: track.title.trim().replace(/\s+/g, " "),
        artist: track.artist.trim().replace(/\s+/g, " "),
        duration: track.duration
    };

    return { success: true, code: 201, data: trackRecord };
}

export function updateTrack(idTrack: string, track: Track): ErrorService | updateSuccessService<TrackBD> {
    if (!isValidTrack(track)) {
        return { success: false, code: 400, message: "Invalid data." };
    }

    const index: number = tracks.findIndex((t: Track) => t.id === idTrack);

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
    return { success: true, code: 200, data: trackBD, index };
}

export function deleteTrack(idTrack: string): deleteSuccessService | ErrorService {
    const index: number = tracks.findIndex((t: Track) => t.id === idTrack);

    if (index === -1) {
        return { success: false, code: 404, message: `Track ${idTrack} not found` };
    }

    tracks.splice(index, 1);
    return { success: true, code: 204, index };
}

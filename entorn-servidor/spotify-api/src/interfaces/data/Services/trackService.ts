import { randomUUID } from "crypto";
import { tracks } from "../../../data/track/track.js";
import type { ErrorService } from "../../error/errorService.js";
import type { SuccessService } from "../../error/sucessService.js";
import type { TrackBD } from "../../track/trackBD.js";
import type { TrackInput } from "../../track/trackBD.js";
import { isValidTrack } from "../../../validators/track.validator.js";

export function getAllTracks(): TrackBD[] {
    return tracks;
}

export function getTrackById(idTrack: string): TrackBD | undefined {
    return tracks.find((track: TrackBD) => track.id === idTrack);
}

export function createTrack(track: TrackInput): SuccessService<TrackBD> | ErrorService {
    if (!isValidTrack(track)) {
        return { success: false, code: 400, message: "Invalid data." };
    }

    const uuid: string = randomUUID();

    const trackRecord: TrackBD = {
        id: uuid,
        title: track.title.trim().replace(/\s+/g, " "),
        artist: track.artist.trim().replace(/\s+/g, " "),
        duration: track.duration
    };

    tracks.push(trackRecord);

    return { success: true, code: 201, data: trackRecord };
}
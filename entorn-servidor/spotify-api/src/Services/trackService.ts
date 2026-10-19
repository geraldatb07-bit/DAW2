import { randomUUID } from "crypto";
import { tracks } from "../data/track/track.data";
import { isValidTrack } from "../validators/track.validator";
import type { updateSuccessService } from "../interfaces/error/updateSuccessService";
import type { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { errorService } from "../interfaces/error/errorService";
import { successService } from "../interfaces/error/SuccessService";
import { Track } from "../interfaces/track/track";
import { TrackBD } from "../interfaces/track/trackBD";
import { ConnectionPool, IResult, UniqueIdentifier} from "mssql";
import { getConnection } from "../config/database";
import sql from "mssql";

export async function getAllTracks(): Promise<TrackBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from Track`;
    const result: IResult<TrackBD> = await request.query(queryText);
    return result.recordset;
}

export async function getTrackById(idTrack: string): Promise<TrackBD | undefined> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from Track Where Track.id=@id`;
    request.input("id",UniqueIdentifier, idTrack);

    const result: IResult<TrackBD> = await request.query(queryText);

    if(result.recordset.length===0)

    console.log(result);
    return result.recordset;
}


export function createTrack(track: Track): errorService | successService<TrackBD> {
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

export function updateTrack(idTrack: string, track: Track): errorService | updateSuccessService<TrackBD> {
    if (!isValidTrack(track)) {
        return { success: false, code: 400, message: "Invalid data." };
    }

    const index: number = tracks.findIndex((t: TrackBD) => t.id === idTrack);

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

export function deleteTrack(idTrack: string): deleteSuccessService | errorService {
    const index: number = tracks.findIndex((t: TrackBD) => t.id === idTrack);

    if (index === -1) {
        return { success: false, code: 404, message: `Track ${idTrack} not found` };
    }

    tracks.splice(index, 1);
    return { success: true, code: 204, index };
}

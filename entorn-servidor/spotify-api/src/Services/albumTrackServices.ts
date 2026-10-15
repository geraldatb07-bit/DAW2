import { randomUUID } from "crypto";
import { albumTracks } from "../data/albumTracks/albumTracks.data";
import { AlbumTrack } from "../interfaces/albumTracks/albumTracks";
import { AlbumTrackBD } from "../interfaces/albumTracks/albumTracksBD";
import { errorService } from "../interfaces/error/errorService";
import { successService } from "../interfaces/error/SuccessService";
import { isValidAlbumTrack } from "../validators/albumTrack.validator";
import { deleteSuccessService } from "../interfaces/error/deleteSuccessService";

export function getAllAlbumTracks(): AlbumTrackBD[] {
    return albumTracks;
}



export function createAlbumTrack(ATrack: AlbumTrack): successService<AlbumTrackBD> | errorService {

    if (!isValidAlbumTrack(ATrack)) {
        return { success: false, code: 400, message: "fuck you" };
    }

    // les correctes son dades
    const uuid: string = randomUUID();

    const AlbumTrackRecord: AlbumTrackBD = {
        id: uuid,
        album: ATrack.album.trim().replace(/\s+/g, " "),
        track: ATrack.track.trim().replace(/\s+/g, " "),

    };
    albumTracks.push(AlbumTrackRecord);

    return { success: true, data: AlbumTrackRecord, code: 201 };


}

export function deleteAlbumTrack(id: string | string[]): deleteSuccessService | errorService {

    const index: number = albumTracks.findIndex(
        (t: AlbumTrackBD) => { return t.id === id }
    );
    if (index === -1) {
        return { success: false, code: 404, message: `AlbumTrack ${id} not found lol` };
    }

    return { success: true, code: 204, index: index }

}
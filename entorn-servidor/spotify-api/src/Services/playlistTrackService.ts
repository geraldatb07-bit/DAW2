import { randomUUID } from "crypto";
import { playlists } from "../data/playlist/playlist.data";
import { playlistTracks } from "../data/playlistTrack/playlistTracks.data";
import { tracks } from "../data/track/track.data";
import { PlaylistTrackBD } from "../interfaces/playlistTrack/playlistTracksBD";
import { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { errorService } from "../interfaces/error/errorService";
import { SuccessService } from "../interfaces/error/SuccessService";

export function getAllPlaylistTracks(): PlaylistTrackBD[] {
    return playlistTracks;
}

export function getPlaylistTrackById(idPlaylistTrack: string): PlaylistTrackBD | undefined {
    return playlistTracks.find((playlistTrack: PlaylistTrackBD) => playlistTrack.id === idPlaylistTrack);
}

export function createPlaylistTrack(playlistTrack: playlistTrack): SuccessService<PlaylistTrackBD> | ErrorService {
    if (!isValidPlaylistTrack(playlistTrack)) {
        return { success: false, code: 400, message: "invalid data" };
    }

    const playlistId: string = playlistTrack.playlistId.trim();
    const trackId: string = playlistTrack.trackId.trim();

    if (!playlists.some((playlist) => playlist.id === playlistId)) {
        return { success: false, code: 404, message: `Playlist ${playlistId} not found` };
    }
    if (!tracks.some((track) => track.id === trackId)) {
        return { success: false, code: 404, message: `Track ${trackId} not found` };
    }

    const playlistTrackRecord: PlaylistTrackBD = {
        id: randomUUID(),
        playlistId,
        trackId
    };

    return { success: true, code: 201, data: playlistTrackRecord };
}

export function deletePlaylistTrack(idPlaylistTrack: string): deleteSuccessService | errorService {
    const playlistTrackIndex: number = playlistTracks.findIndex(
        (playlistTrack: PlaylistTrackBD) => playlistTrack.id === idPlaylistTrack
    );
    if (playlistTrackIndex === -1) {
        return { success: false, code: 404, message: "PlaylistTrack not found" };
    }

    return { success: true, code: 204, index: playlistTrackIndex };
}
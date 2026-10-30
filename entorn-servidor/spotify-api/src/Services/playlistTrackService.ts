import { randomUUID } from "crypto";
import { playlists } from "../data/playlist/playlist.data";
import { playlistTracks } from "../data/playlistTrack/playlistTracks.data";
import { tracks } from "../data/track/track.data";
import type { PlaylistTrackBD } from "../interfaces/playlistTrack/playlistTracksBD";
import type { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import type { errorService } from "../interfaces/error/errorService";
import type { successService } from "../interfaces/error/SuccessService";
import sql, { ConnectionPool, IResult } from "mssql";
import { getConnection } from "../config/database";
import { TrackBD } from "../interfaces/track/trackBD";


export async function getAllPlaylistTracks(): Promise<PlaylistTrackBD[]> {
    const pool: ConnectionPool = await getConnection();
        const request: sql.Request = pool.request();
    
        const queryText: string = `Select * from Track`;
        const result: IResult<PlaylistTrackBD> = await request.query(queryText);
        return result.recordset;
}

export function getPlaylistTrackById(idPlaylistTrack: string): PlaylistTrackBD | undefined {
    return playlistTracks.find((playlistTrack: PlaylistTrackBD) => playlistTrack.id === idPlaylistTrack);
}

export function createPlaylistTrack(playlistTrack: { playlistId: string; trackId: string }): successService<PlaylistTrackBD> | errorService {
    if (!playlistTrack || typeof playlistTrack.playlistId !== "string" || typeof playlistTrack.trackId !== "string") {
        return { success: false, code: 400, message: "invalid data" };
    }

    const playlistId: string = playlistTrack.playlistId.trim();
    const trackId: string = playlistTrack.trackId.trim();

    const playlist = playlists.find((playlist) => playlist.id === playlistId);
    if (!playlist) {
        return { success: false, code: 404, message: `Playlist ${playlistId} not found` };
    }
    const track = tracks.find((track) => track.id === trackId);
    if (!track) {
        return { success: false, code: 404, message: `Track ${trackId} not found` };
    }

    const playlistTrackRecord: PlaylistTrackBD = {
        id: randomUUID(),
        playlist,
        track
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
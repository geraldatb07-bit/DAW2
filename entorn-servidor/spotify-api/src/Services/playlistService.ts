import { randomUUID } from "crypto";
import { playlists } from "../data/playlist/playlist.data";
import { users } from "../data/user/user.data";
import type { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import type { errorService } from "../interfaces/error/errorService";
import type { successService } from "../interfaces/error/SuccessService";
import type { createSuccessService } from "../interfaces/error/createSuccessService";
import type { Playlist } from "../interfaces/playlist/playlist";
import type { PlaylistBD } from "../interfaces/playlist/playlistBD";
import { UserBD } from "../interfaces/User/userBD";
import { isValidPlaylist } from "../validators/playlist.validator";


export function getAllPlaylists(): PlaylistBD[] {
    return playlists;
}

export function getPlaylistById(idPlaylist: string): PlaylistBD | undefined {
    return playlists.find((playlist: PlaylistBD) => playlist.id === idPlaylist);
}

export function createPlaylist(playlist: Playlist): successService<PlaylistBD> | errorService {
    if (!isValidPlaylist(playlist)) {
        return { success: false, code: 400, message: "Invalid data." };
    }

    const user = users.find((existingUser: UserBD) =>
        existingUser.email === playlist.user.email.trim()
        && existingUser.country.countryName === playlist.user.country.countryName
    );
    if (!user) {
        return { success: false, code: 404, message: `User ${playlist.user.email} not found` };
    }

    const playlistRecord: PlaylistBD = {
        id: randomUUID(),
        title: playlist.title.trim().replace(/\s+/g, " "),
        user
    };

    playlists.push(playlistRecord);
    return { success: true, code: 201, data: playlistRecord };
}

export function updatePlaylist(idPlaylist: string, playlist: Playlist): createSuccessService<PlaylistBD> | errorService {
    const playlistIndex: number = playlists.findIndex((item: PlaylistBD) => item.id === idPlaylist);
    if (playlistIndex === -1) {
        return { success: false, code: 404, message: "Playlist not found" };
    }

    if (!isValidPlaylist(playlist)) {
        return { success: false, code: 400, message: "invalid data" };
    }

    const user = users.find((existingUser: UserBD) =>
        existingUser.email === playlist.user.email.trim()
        && existingUser.country.countryName === playlist.user.country.countryName
    );
    if (!user) {
        return { success: false, code: 404, message: `User ${playlist.user.email} not found` };
    }

    const updatedPlaylist: PlaylistBD = {
        id: idPlaylist,
        title: playlist.title.trim().replace(/\s+/g, " "),
        user
    };

    playlists[playlistIndex] = updatedPlaylist;
    return { success: true, code: 200, data: updatedPlaylist, index: playlistIndex };
}

export function deletePlaylist(idPlaylist: string): deleteSuccessService | errorService {
    const playlistIndex: number = playlists.findIndex((playlist: PlaylistBD) => playlist.id === idPlaylist);
    if (playlistIndex === -1) {
        return { success: false, code: 404, message: "Playlist not found" };
    }

    playlists.splice(playlistIndex, 1);
    return { success: true, code: 204, index: playlistIndex };
}
import { Playlist } from "../interfaces/Playlist/playlistBD";

export function isValidPlaylist(playlist: Playlist): boolean {
    return Boolean(
        playlist
        && playlist.title?.trim()
        && playlist.user?.email?.trim()
        && playlist.user.country?.id?.trim()
    );
}

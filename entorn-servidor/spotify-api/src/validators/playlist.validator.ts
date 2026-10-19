import { Playlist } from "../interfaces/playlist/playlist";

export function isValidPlaylist(playlist: Playlist): boolean {
    return Boolean(
        playlist
        && playlist.title?.trim()
        && playlist.user?.email?.trim()
        && playlist.user.country?.countryName?.trim()
    );
}

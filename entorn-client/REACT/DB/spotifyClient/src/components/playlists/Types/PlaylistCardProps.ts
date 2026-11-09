import type { GETPlaylist } from "../../../APIManagement/Playlists/Interfaces/Playlist";
import type { GETTrack } from "../../../APIManagement/Tracks/Interfaces/Track";

export interface PlaylistCardProps {
    playlists: GETPlaylist[];
    onSelectPlaylist: (playlistId: string) => void;
    selectedPlaylistTitle: string;
    tracks: GETTrack[];
    onPlayTrack: (track: GETTrack) => void;
}
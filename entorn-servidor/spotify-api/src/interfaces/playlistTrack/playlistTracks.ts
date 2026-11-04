import { TrackBD } from "../track/trackBD";
import { PlaylistBD } from "../Playlist/playlistBD";

export interface PlaylistTracks {
    id: string; //PK
    playlist: PlaylistBD; //FK
    track: TrackBD; //FK
}
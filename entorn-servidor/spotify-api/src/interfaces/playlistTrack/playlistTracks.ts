import { TrackBD } from "../track/trackBD";
import { PlaylistBD } from "../playlist/playlistBD";

export interface PlaylistTracks {
    id: string; //PK
    playlist: PlaylistBD; //FK
    track: TrackBD; //FK
}
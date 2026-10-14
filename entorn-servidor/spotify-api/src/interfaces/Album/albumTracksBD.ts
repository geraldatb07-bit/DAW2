import { TrackBD } from "../track/trackBD";
import { Album } from "./albumBD";

export interface AlbumTracks {
    id: string; //PK
    album: Album; //FK
    track: TrackBD; //FK
}
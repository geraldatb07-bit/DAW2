import { TrackBD } from "../track/trackBD";
import { AlbumBD } from "./albumBD";

export interface AlbumTracks {
    id: string; //PK
    album: AlbumBD; //FK
    track: TrackBD; //FK
}
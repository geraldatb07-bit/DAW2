import { Track } from "../data/track";
import { Playlist } from "./playlist";

export interface PlaylistTracks {
    id: string;
    playlist: Playlist; //FK
    track: Track; //FK
}
import { Track } from "../data/track";
import { Album } from "./album";

export interface AlbumTracks {
    id: string;
    album: Album;
    track: Track;
}
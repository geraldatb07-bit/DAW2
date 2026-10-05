import { Artist } from "../artist/artist";
import { Track } from "../data/track";
import { Playlist } from "../Playlist/playlist";

export interface Album {
    id: string;
    artist: Artist; //FK
    data: string; 
}
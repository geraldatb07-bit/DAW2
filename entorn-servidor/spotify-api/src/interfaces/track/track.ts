import { Artist } from "../artist/artist";

export interface Track {
    title: string;
    artist: Artist; //FK
    duration: number;
}
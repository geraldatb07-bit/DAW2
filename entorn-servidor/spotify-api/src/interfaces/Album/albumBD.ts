import { ArtistBD } from "../artist/artistBD";

export interface Album {
    id: string; //PK
    artist: ArtistBD; //FK
    data: string; 
}
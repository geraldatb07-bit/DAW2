import { ArtistBD } from "../artist/artistBD";

export interface AlbumBD {
    id: string; //PK
    artist: ArtistBD; //FK
    data: string; 
}
import { User } from "../User/user";

export interface Playlist {
    id: string;
    title: string;
    user: User; //FK
}
import { User } from "../User/user";

export interface Playlist {
    title: string;
    user: User; //FK
}
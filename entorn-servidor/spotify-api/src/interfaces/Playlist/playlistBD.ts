import { UserBD } from "../User/userBD";

export interface PlaylistBD {
    id: string; //PK
    user: UserBD; //FK
    title: string;
}
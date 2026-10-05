import { Track } from "../data/track";
import { User } from "../User/user";

export interface History {
    id: string;
    user: User; //FK
    track: Track; //FK
    data: string;
}
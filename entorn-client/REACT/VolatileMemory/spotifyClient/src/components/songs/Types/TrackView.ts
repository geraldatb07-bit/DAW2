import type { Like } from "./likes";

export interface TrackView {
    title: string;
    artist: string;
    duration: number;
    reproduccions: number;
    likes: Like;
}
import type { Track } from "../data/track";

export interface TrackBD extends Track {
    id: string;
}

export type TrackInput = Omit<TrackBD, "id">;
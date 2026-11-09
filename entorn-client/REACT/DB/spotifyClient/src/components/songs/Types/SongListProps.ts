import type { GETTrack } from "../../../APIManagement/Tracks/Interfaces/Track";

export interface SongListProps {
    tracks: GETTrack[];
    onPlayTrack: (track: GETTrack) => void;
}
import type { GETTrack } from "../../../APIManagement/Tracks/Interfaces/Track";

export interface PlaylistTracksCardProps {
    title: string;
    tracks: GETTrack[];
    onPlayTrack: (track: GETTrack) => void;
}
import type { TrackListView } from "./TrackListView";

export interface SongListProps {
    tracks: TrackListView[]
    onPlay: (track: TrackListView) => void
    isPlaying: boolean;
    playingTrackId: string;
}
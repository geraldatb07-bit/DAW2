export interface SongRowProps {
    title: string;
    artist: string;
    duration: number;
    onPlay: () => void;
    id: string;
    isPlaying: boolean;
    playingTrackId: string;
}
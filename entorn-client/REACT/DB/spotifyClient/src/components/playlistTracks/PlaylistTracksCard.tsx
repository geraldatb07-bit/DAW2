import type { GETTrack } from "../../APIManagement/Tracks/Interfaces/Track";
import ListSongs from "../songs/ListSongs";

interface PlaylistTracksCardProps {
    title: string;
    tracks: GETTrack[];
    onPlayTrack: (track: GETTrack) => void;
}

const PlaylistTracksCard = (props: PlaylistTracksCardProps) => {
    return (
        <section className="playlist-tracks-component">
            <h2>{props.title}</h2>
            <table>
                <tbody>
                    <ListSongs
                        tracks={props.tracks}
                        onPlayTrack={props.onPlayTrack}
                    />
                </tbody>
            </table>
        </section>
    );
};

export default PlaylistTracksCard;

import ListSongs from "../songs/ListSongs";
import type { PlaylistTracksCardProps } from "./Types/PlaylistTracksCardProps";

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

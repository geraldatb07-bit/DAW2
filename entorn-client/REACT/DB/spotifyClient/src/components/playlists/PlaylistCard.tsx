import type { PlaylistCardProps } from "./Types/PlaylistCardProps";
import PlaylistTracksCard from "../playlistTracks/PlaylistTracksCard";

const PlaylistCard = (props: PlaylistCardProps) => {
    return (
        <section className="playlist-component">
            <h2>Llistes de reproducció</h2>

            {props.playlists.length === 0 ? <p>No hi ha playlists disponibles</p> : 
            (
                <ul>
                    {props.playlists.map(playlist => (
                        <li key={playlist.id}>
                            {playlist.title}
                            <button onClick={() => props.onSelectPlaylist(playlist.id)}>Select</button>
                        </li>
                    ))}
                </ul>
            )}

            {props.selectedPlaylistTitle !== '' ? 
            (
                <PlaylistTracksCard
                    title={props.selectedPlaylistTitle}
                    tracks={props.tracks}
                    onPlayTrack={props.onPlayTrack}
                />
            ): null}
        </section>
    );
};

export default PlaylistCard;
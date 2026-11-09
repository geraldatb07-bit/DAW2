import type { PlaylistCardProps } from "./Types/PlaylistCardProps";

const PlaylistCard = (props: PlaylistCardProps) => {
    return (
        <section className="playlist-component">
            <h2>Llistes de reproducció</h2>

            {props.playlists.length === 0 ? (
                <p>No hi ha playlists disponibles</p>
            ) : (
                <ul>
                    {props.playlists.map(playlist => (
                        <li key={playlist.id}>{playlist.title}</li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default PlaylistCard;
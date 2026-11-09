import type { Track } from "../../Model/Track";
import SongRow from "./SongRow";
import type { SongListProps } from "./Types/SongListProps";


const ListSongs = (props: SongListProps) => {
    return (
    <>
        {
            props.tracks.map(
                (t: Track) => {
                    return <SongRow
                        key={t.id}
                        title={t.title}
                        artist={t.artist}
                        duration={t.duration}
                        onPlay={() => props.onPlay(t)}
                        id={t.id}
                        isPlaying={props.isPlaying}
                        playingTrackId={props.playingTrackId}
                    />
                }
            ) 
        }
    </>
    )

}

export default ListSongs;
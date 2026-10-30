import type { Track } from "../../Model/Track";
import SongRow from "./SongRow";
import type { SongListProps } from "./Types/SongListProps";


const ListSongs = (props: SongListProps) => {
return (
    <>
        props.map(
        {
            props.tracks.map(
                (t: Track) => {
                    return <SongRow
                        key={t.id}
                        title={t.title}
                        artist={t.artist}
                        duration={t.duration}
                    />
                }
            )
        }
        )
    
    </>
)

}

export default ListSongs;
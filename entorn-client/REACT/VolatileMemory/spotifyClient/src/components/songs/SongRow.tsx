import { formatDuration } from "../../App";
import type { SongRowProps } from "./Types/SongRowProps";


const SongRow = (props: SongRowProps) => {
    const isCurrentSongPlaying = props.isPlaying ? props.id === props.playingTrackId : false; 
    return (
        <tr>
            <td>Títol: {props.title}</td>
            <td>Artist: {props.artist}</td>
            <td>Duration: {formatDuration(props.duration)}</td>
            <td>
                {isCurrentSongPlaying ? null : <button onClick={props.onPlay}>Play</button>}
            </td>
        </tr>
    )
}

export default SongRow;
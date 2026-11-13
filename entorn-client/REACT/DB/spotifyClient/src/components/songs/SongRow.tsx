import { formatDuration } from "../../App";
import type { SongRowProps } from "./Types/SongRowProps";


const SongRow = (props: SongRowProps) => {

    return (
        <tr>
            <td>Títol: {props.title}</td>
            <td>Artist: {props.artist}</td>
            <td>Duration: {formatDuration(props.duration)}</td>
            <td>
                <button onClick={props.onPlay}>Play</button>
            </td>
        </tr>
    )
}

export default SongRow;
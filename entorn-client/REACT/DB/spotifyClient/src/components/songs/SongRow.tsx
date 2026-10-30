import type { SongRowProps } from "./Types/SongRowProps";


const SongRow = (props: SongRowProps) => {

    return (
        <tr>
            <td>Títol: {props.title}</td>
            <td>Artist: {props.artist}</td>
            <td>Duration: {props.duration}</td>
        </tr>
    )
}

export default SongRow;
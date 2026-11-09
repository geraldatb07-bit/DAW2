import { formatDuration } from "../../App";
import type { HistoryCardProps } from "./Types/HistoryCardProps";


const HistoryCard = (props: HistoryCardProps) => {

    return (
        <section className="history-component">
        <h2>Historial de cançons</h2>
        <table>
            <tbody>
                {props.history.map((song, index) => (
                    <tr key={index}>
                        <td>{song.title}</td>
                        <td>{song.artist}</td>
                        <td>{formatDuration(song.duration)}</td>
                        <td>{song.playedTime}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </section>
    )
}

export default HistoryCard;
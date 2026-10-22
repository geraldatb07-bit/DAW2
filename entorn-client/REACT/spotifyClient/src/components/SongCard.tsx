import type { SongCardProps } from "./Types/SongCardProps";

const SongCard = ({trackInfo}:SongCardProps) => {
    return (
        <>
            <h1>Títol: {trackInfo.title}</h1>
            <p>Artist: {trackInfo.artist}</p>
            <p>Duration: {trackInfo.duration}</p>
            <p>Total Reproduccions: {trackInfo.reproduccions}</p>
        </>
    )
}

export default SongCard;
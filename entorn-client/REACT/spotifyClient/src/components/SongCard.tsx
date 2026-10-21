import type { SongCardProps } from "./Types/SongCardProps";

const SongCard = ({trackInfo}:SongCardProps) => {
    return (
        <>
            <h1>Titol: {trackInfo.title}</h1>
            <p>Artist: {trackInfo.artist}</p>
            <p>Duration: {trackInfo.duration}</p>
            <p>Total Reproduccions: {trackInfo.reproduccions}</p>
        </>
    )
}

export default SongCard;
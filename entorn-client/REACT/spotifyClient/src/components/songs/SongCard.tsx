import type { SongCardProps } from "./Types/SongCardProps";

const SongCard = ({ trackInfo }: SongCardProps) => {
    return (
        <>
            <h3>Títol: {trackInfo.title}</h3>
            <p>Artist: {trackInfo.artist}</p>
            <p>Duration: {trackInfo.duration}</p>
            <p>Total Reproduccions: {trackInfo.reproduccions}</p>
        </>
    )
}

export default SongCard;
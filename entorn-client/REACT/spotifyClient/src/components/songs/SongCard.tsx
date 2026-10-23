import { useState } from "react";
import type { SongCardProps } from "./Types/SongCardProps";

const SongCard = ({ trackInfo }: SongCardProps) => {


    let [totalReproduccions, setTotalReproduccions] = useState<number>(trackInfo.reproduccions);

    function handleClickPlay() {
        const tr = (prev:number) => {return prev + 1}
        setTotalReproduccions(tr);
    }

    return (
        <>
            <h3>Títol: {trackInfo.title}</h3>
            <p>Artist: {trackInfo.artist}</p>
            <p>Duration: {trackInfo.duration}</p>
            <p>Total Reproduccions: {totalReproduccions}</p>
            <p><button onClick={handleClickPlay}>Play</button></p>
        </>
    )
}

export default SongCard;
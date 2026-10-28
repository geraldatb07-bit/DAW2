import { useState } from "react";
import type { PlayingView } from "./Types/PlayingView";

const PlayingCard = () => {

    const [playing, setPlaying] = useState<PlayingView>({
        "volum": 0
    })

    function upSpeaker() {
        setPlaying(prev => ({
            ...prev,
            volum: prev.volum + 1
        }));
    }

    function downSpeaker() {
        setPlaying(prev => {
            if (prev.volum > 0) {
                return {
                    ...prev,
                    volum: prev.volum - 1
                };
            }
            return prev;
        });
    }


    return (
        <>
            <h3>Reproduint</h3>

            <button onClick={downSpeaker}>-</button>
            <p>Nivell: {playing.volum}</p>
            <button onClick={upSpeaker}>+</button>
        </>
    )
}

export default PlayingCard;
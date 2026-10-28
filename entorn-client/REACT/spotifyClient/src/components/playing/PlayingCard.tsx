import { useState } from "react";
import type { PlayingView } from "./Types/PlayingView";

const PlayingCard = (props: { isPlaying: boolean }) => {

    const [playing, setPlaying] = useState<PlayingView>({
        "volum": 0
    })

    function upSpeaker() {
        setPlaying(prev => {
            if (prev.volum < 10) {
                return {
                    ...prev,
                    volum: prev.volum + 1
                };
            }
            return prev;
        });
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
        <section className = "playing-component">
            <h2>Reproduint</h2>
            <button onClick={downSpeaker}>-</button>
            <p>Nivell: {playing.volum}</p>
            <button onClick={upSpeaker}>+</button>
            {props.isPlaying && <p>Playing Song</p>}
        </section>
    )
}

export default PlayingCard;
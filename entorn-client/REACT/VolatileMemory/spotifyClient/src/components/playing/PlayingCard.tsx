import { useState } from "react";
import type { PlayingView } from "./Types/PlayingView";
import type { TrackView } from "../songs/Types/TrackView";

const PlayingCard = (props: { isPlaying: boolean, trackInfo: TrackView, onStop: () => void }) => {

    const [playing, setPlaying] = useState<PlayingView>({
        "volum": 0
    })

    function upSpeaker() {
        setPlaying(prev => {
            if (prev.volum < 100) {
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
        <section className="playing-component">
            <h2>Reproduint</h2>
            <button onClick={downSpeaker}>-</button>
            <p>Nivell: {playing.volum}</p>
            <button onClick={upSpeaker}>+</button>
            {props.isPlaying ? (
                    <>
                        <p>{props.trackInfo.title}</p>
                        <button onClick={props.onStop}>Stop</button>
                    </>
                ) : (<p>No song is playing</p>)
            }
        </section>
    )
}

export default PlayingCard;
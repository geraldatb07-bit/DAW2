import { useState } from "react";
import type { SongCardProps } from "./Types/SongCardProps";
import likeIcon from "../../assets/like.png";
import dislikeIcon from "../../assets/dislike.png";
import type { LikesView } from "./Types/likes";


const SongCard = ({ trackInfo }: SongCardProps) => {


    let [totalReproduccions, setTotalReproduccions] = useState<number>(trackInfo.reproduccions);

    let [likesInfo, setTotalLikes] = useState<LikesView>({totalLikes:5, like: false});

    function handleClickPlay() {
        const tr = (prev:number) => {return prev + 1}
        setTotalReproduccions(tr);
    }

    function handleClickIcon() {

        let incLikes = 1;
        const lk = (prev: LikesView) => { 

            if (prev.like) { 
                incLikes = -1;
            }
                return {
                    totalLikes: prev.totalLikes + incLikes,
                    like: !prev.like
                }                   
         }
        setTotalLikes(lk);
    }

    const viewIcon: boolean = true;



    return (
        <>
            <h3>Títol: {trackInfo.title}</h3>
            <p>Artist: {trackInfo.artist}</p>
            <p>Duration: {trackInfo.duration}</p>
            <p>Total Reproduccions: {totalReproduccions}</p>
            <p><button onClick={handleClickPlay}>Play</button></p>

            <div>
                <button onClick={handleClickIcon}>
                    <img src={likesInfo.like ? likeIcon : dislikeIcon  } width={50} />
                </button>
                <p>{likesInfo.totalLikes}</p>
            </div>



        </>
    )
}

export default SongCard;
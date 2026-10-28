import type { SongCardProps } from "./Types/SongCardProps";
import likeIcon from "../../assets/like.png";
import dislikeIcon from "../../assets/dislike.png";

const SongCard = (props: SongCardProps) => {

    function handleClickPlay() {
        props.play();
    }

    function handleClickReset(){
        props.reset();
    }
    
    function handleClickIcon() {
        props.like();
    }

    return (
        <>
            <h3>Títol: {props.trackInfo.title}</h3>
            <p>Artist: {props.trackInfo.artist}</p>
            <p>Duration: {props.trackInfo.duration}</p>
            <p>Total Reproduccions: {props.trackInfo.reproduccions}</p>
            <p><button onClick={() => handleClickPlay()}>Play</button></p>
            <div>
                <img onClick={() => handleClickIcon()} 
                src={props.trackInfo.likes.like ? likeIcon : dislikeIcon} width={50} />
                <p>{props.trackInfo.likes.totalLikes}</p>
            </div>
            <button onClick={handleClickReset}>Reiniciar</button>
        </>
    )
}

export default SongCard;
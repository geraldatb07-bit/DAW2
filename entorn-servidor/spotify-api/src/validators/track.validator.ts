import { Track } from "../interfaces/data/track.js";

export function isValidTrack(track:Track):boolean{
    let correcte:boolean = true;
    if (track.artist.length===0 || track.title.length===0 || track.duration<=0){
        return false;
    }
    return correcte;
   
}
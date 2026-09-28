import type { Track } from "../interface/interface-track";

export function createRowSong(track: Track): HTMLTableRowElement {
    const songTr: HTMLTableRowElement = document.createElement("tr");

    const titleTd: HTMLTableCellElement = document.createElement("td");
    titleTd.textContent = track.title;

    const durationTd: HTMLTableCellElement = document.createElement("td");
    durationTd.textContent = track.duration.toString();

    songTr.appendChild(titleTd);
    songTr.appendChild(durationTd);

    titleTd.addEventListener("click",
        () => {

            console.log(getIdTrack(track));
        }
    )
    durationTd.addEventListener("click",
        () => {

            console.log(getIdTrack(track));
        }
    )

    return songTr;
}

function getIdTrack(track: Track): string {
    return track.id
}


import type { Track } from "../interface/interface-track";

export function createRowSong(track: Track, cardTrack: (idTrack: string) => void): HTMLTableRowElement {
    const songTr: HTMLTableRowElement = document.createElement("tr");


    const titleTd: HTMLTableCellElement = document.createElement("td");
    titleTd.textContent = track.title;

    const durationTd: HTMLTableCellElement = document.createElement("td");
    durationTd.textContent = track.duration.toString();

    const reproductionsTd: HTMLTableCellElement = document.createElement("td");
    reproductionsTd.textContent = "0";

    const playBtn: HTMLButtonElement = document.createElement("button");
    playBtn.textContent = "Play";


    songTr.appendChild(titleTd);
    songTr.appendChild(durationTd);
    songTr.appendChild(reproductionsTd)

    titleTd.addEventListener("click",
        () => {
            const idTrack: string = getIdTrack(track);
            console.log(idTrack);
            cardTrack(idTrack);
        }
    )
    durationTd.addEventListener("click",
        () => {
            const idTrack: string = getIdTrack(track);
            console.log(idTrack);
            cardTrack(idTrack);
        }
    )

    return songTr;
}

function getIdTrack(track: Track): string {
    return track.id
}


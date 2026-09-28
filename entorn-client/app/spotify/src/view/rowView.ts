import type { Track } from "../interface/interface-track";

export function createRowSong(track: Track, cardTrack: (idTrack: string) => void): HTMLTableRowElement {
    const songTr: HTMLTableRowElement = document.createElement("tr");

    const titleTd: HTMLTableCellElement = document.createElement("td");
    titleTd.textContent = track.title;

    const durationTd: HTMLTableCellElement = document.createElement("td");
    durationTd.textContent = track.duration.toString();

    songTr.appendChild(titleTd);
    songTr.appendChild(durationTd);

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


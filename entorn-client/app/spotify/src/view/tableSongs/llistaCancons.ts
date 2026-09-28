import type { Track } from "../../interface/interface-track";
import { createRowSong } from "../rowView";

export function llistaCancons(
    tracks: Track[],
    tbody: HTMLTableSectionElement,
    cardTrack: (idTrack: string) => void
): void {
    tracks.forEach(
        (t: Track) => { tbody.appendChild(createRowSong(t, cardTrack)); }
    )
}
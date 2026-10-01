import type { Track } from "../../interface/interface-track";
import { createRowSong } from "../rowView";

export function llistaCancons(
    tracks: Track[],
    tbody: HTMLTableSectionElement,
    cardTrack: (idTrack: string) => void
): void {
    let currentlyPlayingButton: HTMLButtonElement | null = null;
    const PlayingButton = (button: HTMLButtonElement): boolean => {

    };
    tracks.forEach(
        (t: Track) => { tbody.appendChild(createRowSong(t, cardTrack)); }
    )
}
import type { Track } from "../../interface/interface-track";
import { createRowSong } from "../rowView";

export function llistaCancons(
    tracks: Track[],
    tbody: HTMLTableSectionElement,
    cardTrack: (idTrack: string) => void
): void {
    let currentlyPlayingButton: HTMLButtonElement | null = null;
    let stopCurrentlyPlaying: (() => void) | null = null;

    tracks.forEach((t: Track) => {
        const row = createRowSong(t, cardTrack, (button, stop) => {
            if (stop) {
                if (currentlyPlayingButton && currentlyPlayingButton !== button) {
                    stopCurrentlyPlaying?.();
                }
                currentlyPlayingButton = button;
                stopCurrentlyPlaying = stop;
            } else if (currentlyPlayingButton === button) {
                currentlyPlayingButton = null;
                stopCurrentlyPlaying = null;
            }
        });
        tbody.appendChild(row);
    });
}
import { tracks } from "../../data/track";
import { createTableHead } from "./createTableHead";
import { llistaCancons } from "./llistaCancons";

export function crearTableSongs(
    tbody: HTMLTableSectionElement,
    cardTrack: (idTrack: string) => void
): HTMLTableElement {

    const table: HTMLTableElement = document.createElement("table");
    table.appendChild(createTableHead());

    const thReproductions = document.createElement("th");
    thReproductions.textContent = "Reproduccions";


    llistaCancons(tracks, tbody, cardTrack);
    table.appendChild(tbody);
    return table

}
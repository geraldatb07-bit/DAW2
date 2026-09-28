import './style.css';
import { crearCerca } from './view/cerca/cerca';
import { crearTitol } from './view/tableSongs/crearTitol';
import { crearTableSongs } from './view/tableSongs/crearTableSongs';
import type { Track } from './interface/interface-track';
import { tracks } from './data/track';
import { llistaCancons } from './view/tableSongs/llistaCancons';

const appObj: HTMLElement = document.querySelector<HTMLDivElement>('#app')!;
const tbody: HTMLTableSectionElement = document.createElement('tbody');


const cercar:(textABuscar:string) => void = (textABuscar:string) => {
    const llistaTracks:Track[] = tracks.filter(
        (t: Track) => { return t.title.toLowerCase().includes(textABuscar.trim().toLowerCase())}
    );
    tbody.innerHTML = "";
    llistaCancons(llistaTracks,tbody);

}
appObj.appendChild(crearTitol());
appObj.appendChild(crearCerca(cercar));
appObj.appendChild(crearTableSongs(tbody));


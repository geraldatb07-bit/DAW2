import './style.css';
import { crearCerca } from './view/cerca/cerca';
import { crearTitol } from './view/tableSongs/crearTitol';
import { crearTableSongs } from './view/tableSongs/crearTableSongs';

const appObj: HTMLElement = document.querySelector<HTMLDivElement>('#app')!;

const titol: HTMLHeadElement = crearTitol();
const table: HTMLTableElement = crearTableSongs();
const form: HTMLFormElement = crearCerca();

appObj.appendChild(titol);
appObj.appendChild(table);
appObj.appendChild(form);


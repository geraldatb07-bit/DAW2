// Utilitzant el filter retorni totes les cancons de un determinat artista.

interface Canco {
    titol: string;
    artista: string;
    durada: number;
}

const cancons: Canco[] = [
    { titol: "Blinding Lights", artista: "The Weeknd", durada: 200 },
    { titol: "Starboy", artista: "The Weeknd", durada: 230 },
    { titol: "Shape of You", artista: "Ed Sheeran", durada: 240 },
    { titol: "Perfect", artista: "Ed Sheeran", durada: 260 }
];


let artistia: string = "The Weeknd";

const songsSearch: Canco[] = cancons.filter(
    (canco: Canco) => {
        return canco.artista === artistia;
    }
);


console.log(songsSearch);

export { };
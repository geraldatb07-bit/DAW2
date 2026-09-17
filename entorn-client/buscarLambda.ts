
const cancons: Canco[] = [
    {
        id: "6l-km",
        titol: "Blinding Lights",
        artista: "The Weeknd",
        durada: 200
    },
    {
        id: "4bx-t",
        titol: "Starboy",
        artista: "The Weeknd",
        durada: 230
    },
    {
        id: "5gnl-ts",
        titol: "Shape of You",
        artista: "Ed Sheeran",
        durada: 240
    }
];


function buscarCanco(titol: string, cancoList: Canco[]): Canco | undefined {

    return cancoList.find((canco: Canco) => canco.titol === titol);
}

function imprimir(canco: Canco | undefined): void {

    if (canco !== undefined) {
        console.log(canco);
    } else {
        console.log("Cançó no trobada");
    }
}

let titol: string = "Blinding Lights";

const songsSearch: Canco[] = cancons.filter(
    (canco: Canco) => {
        return canco.titol === titol;
    }
);

console.log(songsSearch);




export { };
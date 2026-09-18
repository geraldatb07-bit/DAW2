interface Canco {
    id: string;
    titol: string;
    artista: string;
    durada: number;
}

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


function buscarCanco(titol: string, cancoList: Canco[]): Canco | null {

    const totalCancons: number = cancoList.length;
    let i: number = 0;

    while (i < totalCancons && titol !== cancoList[i].titol) {
        i++;
    }

    if (i < totalCancons) {
        return cancoList[i];
    }

    return null;
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
        return canco.titol === titol && canco.durada > 120;
    }
);

console.log(songsSearch);




export { };
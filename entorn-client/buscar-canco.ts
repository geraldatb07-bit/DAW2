interface Canco {
    id: string;
    titol: string;
    artista: string;
    durada: number;
}

const cancoABuscar: Canco = {
    id: "6l-km",
    titol: "Blinding Lights",
    artista: "The Weeknd",
    durada: 200
};

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

function imprimir(canco: Canco | null): void {

    if (canco !== null) {
        console.log(canco);
    } else {
        console.log("Cançó no trobada");
    }
}


// PROVES

let existeixCanco: Canco | null = buscarCanco(cancoABuscar.titol, cancons);
imprimir(existeixCanco);

existeixCanco = buscarCanco("Shape of You", cancons);
imprimir(existeixCanco);

existeixCanco = buscarCanco("Blinding Lights", cancons);
imprimir(existeixCanco);

existeixCanco = buscarCanco("Despacito", cancons);
imprimir(existeixCanco);
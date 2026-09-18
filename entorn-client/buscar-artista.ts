// Tenim diversos usuaris. 
// Cada usuari té llistes de reproducció.
// Cada llista té cançons. 
// Volem obtenir totes les cançons d'un artista que tingui un usuari determinat.

export { };

interface Canco {
    titol: string;
    artista: string;
    durada: number;
}

interface LlistaReproduccio {
    nom: string;
    cancons: Canco[];
}

interface Usuari {
    nom: string;
    llistes: LlistaReproduccio[];
}

const usuaris: Usuari[] = [
    {
        nom: "Gerald",
        llistes: [
            {
                nom: "llista1",
                cancons: [
                    { titol: "Starboy", artista: "The Weeknd", durada: 230 },
                    { titol: "Perfect", artista: "Ed Sheeran", durada: 260 }
                ]
            },
            {
                nom: "llista2",
                cancons: [
                    { titol: "Blinding Lights", artista: "The Weeknd", durada: 200 },
                    { titol: "Believer", artista: "Imagine Dragons", durada: 204 }
                ]
            }
        ]
    },
    {
        nom: "Pau",
        llistes: [
            {
                nom: "llista3",
                cancons: [
                    { titol: "Shape of You", artista: "Ed Sheeran", durada: 240 },
                    { titol: "Save Your Tears", artista: "The Weeknd", durada: 215 }
                ]
            }
        ]
    }
];

function buscarCanconsArtista(cancons: Canco[], artista: string): Canco[] {
    return cancons.filter((canco: Canco) => {
        return canco.artista === artista;
    });
}

function buscarCanconsUsuari(usuari: Usuari, artista: string): Canco[] {
    let resultat: Canco[] = [];

    for (let i: number = 0; i < usuari.llistes.length; i++) {
        const canconsArtista: Canco[] = buscarCanconsArtista(usuari.llistes[i].cancons, artista);
        resultat.push(...canconsArtista);
    }

    return resultat;
}

// PROVA
const resultat: Canco[] = buscarCanconsUsuari(usuaris[0], "The Weeknd");
console.log(resultat);
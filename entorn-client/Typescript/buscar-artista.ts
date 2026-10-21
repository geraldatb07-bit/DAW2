interface Canco {
    ID: string;
    titol: string;
    artista: string;
    durada: number;
}

interface PlayList {
    name: string;
    cancons: Canco[];
}

interface User {
    name: string;
    playList: PlayList[];
}


const llistatPlay: PlayList[] = [
    {
        name: "LManolo",
        cancons: [
            {
                ID: "2B-CA",
                titol: "HO MY GOOD",
                artista: "U2",
                durada: 90
            },
            {
                ID: "2B-CA",
                titol: "Levels",
                artista: "Avicii",
                durada: 178
            }
        ]
    },
    {
        name: "LPepe",
        cancons: [
            {
                ID: "2B-CA",
                titol: "Waiting for Love",
                artista: "Avicii",
                durada: 178
            },
            {
                ID: "2B-CA",
                titol: "Without You",
                artista: "Avicii",
                durada: 178
            }
        ]
    }
];


const users: User[] = [
    {
        name: "Manolo",
        playList: [llistatPlay[0]]
    },
    {
        name: "Pepe",
        playList: [llistatPlay[1]]
    }
];


// 1. Busca les cançons d'un artista
function songsSearch(artista: string, cancons: Canco[]): Canco[] {

    return cancons.filter(
        (c: Canco) => {
            return artista === c.artista;
        }
    );
}


// 2. Busca les cançons de l'artista dins de totes les playlists
function songsPlayList(artista: string, playList: PlayList[]): Canco[] {

    let cancons: Canco[] = [];

    for (let i: number = 0; i < playList.length; i++) {

        const resultat: Canco[] = songsSearch(artista, playList[i].cancons);

        for (let j: number = 0; j < resultat.length; j++) {
            cancons.push(resultat[j]);
        }
    }

    return cancons;
}


// 3. Busca l'usuari i després busca les cançons
function canconsArtistas(
    artista: string,
    username: string,
    users: User[]
): Canco[] {

    const user: User[] = users.filter(
        (u: User) => {
            return u.name === username;
        }
    );

    const playListUser: PlayList[] = user[0].playList;

    return songsPlayList(artista, playListUser);
}


let artista: string = "Avicii";
let username: string = "Pepe";

const cancons: Canco[] =
    canconsArtistas(artista, username, users);

console.log(cancons);

export { };
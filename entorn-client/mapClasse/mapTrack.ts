interface Canco {
    id: string;
    titol: string;
    artista: string;
    durada: number;
}

interface Track {
    title: string;
    duration: number;
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

const songsString: string[] = cancons.map((c: Canco) => {
    let text: string = `${c.titol} (${c.artista} - durada: ${c.durada})`;
    return text.trim();
});

const tracks: Track[] = cancons.map((c: Canco) => {
    return {
        title: c.titol,
        duration: c.durada
    };
});

tracks.forEach((t: Track) => {
    console.log(t);
});

const resultat: string[] = cancons.map((c: Canco) => {
    const minuts = Math.floor(c.durada / 60);
    const segons = c.durada % 60;

    let text: string = `titol: ${c.titol} , ${minuts}minuts ${segons}segons)`;
    return text.trim();
});

interface Jugador {
    nom: string;
    titular: boolean;
}

interface Equip {
    nom: string;
    jugadors: Jugador[];
}

const equips: Equip[] = [
    {
        nom: "Barça",
        jugadors: [
            { nom: "Joan", titular: true },
            { nom: "Marc", titular: false },
            { nom: "Pau", titular: true }
        ]
    },
    {
        nom: "Madrid",
        jugadors: [
            { nom: "Carlos", titular: false },
            { nom: "David", titular: true },
            { nom: "Alex", titular: true }
        ]
    }
];

function equipTitular(nomEquip: string): Jugador[] {

    const equip = equips.find((e: Equip) => {
        return e.nom === nomEquip;
    });

    if (equip === undefined) {
        return [];
    }

    return equip.jugadors.filter((j: Jugador) => {
        return j.titular === true;
    });
}
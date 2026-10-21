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

const nomEquip: string = "Madrid";

const jugadorsTitulars: Jugador[] = equipTitular(equips, nomEquip);

function equipTitular(equips: Equip[], nomEquip: string): Jugador[] {

    const equip: Equip | undefined = equips.find((e: Equip) => {
        return e.nom === nomEquip;
    });

    if (equip === undefined) {
        return [];
    }

    return equip.jugadors.filter((j: Jugador) => {
        return j.titular;
    });
}

console.log(jugadorsTitulars);
export { };
interface Producte {
    nom: string;
    tempsPreparacio: number;
}

function tempsEntrega(
    productes: Producte[],
    tipusEnviament: string
): string {

    let tempsMaxim: number = 0;

    // Comprovem que hi hagi productes
    if (productes.length === 0) {
        return "El carro està buit";
    }

    // Recorrem tots els productes
    for (let producte of productes) {

        // Comprovem si el temps és correcte
        if (producte.tempsPreparacio < 0 ||
            isNaN(producte.tempsPreparacio)) {

            return "Error: temps de preparació incorrecte";
        }

        // Busquem el producte que triga més
        if (producte.tempsPreparacio > tempsMaxim) {
            tempsMaxim = producte.tempsPreparacio;
        }
    }

    // Enviament standard
    if (tipusEnviament === "standard") {
        return "La comanda arribarà en " +
            tempsMaxim + " dies";
    }

    // Enviament express
    if (tipusEnviament === "express") {

        let tempsLimit: number = 2;

        if (tempsMaxim <= tempsLimit) {
            return "La comanda arribarà en " +
                tempsLimit + " dies (express)";
        } else {
            return "Error: la comanda supera el temps límit express";
        }
    }

    return "Error: tipus d'enviament incorrecte";
}

// Exemple d'ús
let productes: Producte[] = [
    { nom: "Ordinador", tempsPreparacio: 1 },
    { nom: "Ratolí", tempsPreparacio: 2 },
    { nom: "Teclat", tempsPreparacio: 1 }
];

console.log(tempsEntrega(productes, "standard"));
console.log(tempsEntrega(productes, "express"));
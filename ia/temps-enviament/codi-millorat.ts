export { };
interface Producte {
    nom: string;
    tempsPreparacio: number;
}

function tempsEntrega(
    productes: Producte[],
    tipusEnviament: string,
    limitExpress: number
): string {

    // Comprovem si el carro està buit
    if (productes.length === 0) {
        return "El carro està buit";
    }

    // Validem el límit express
    if (!Number.isFinite(limitExpress) || limitExpress < 0) {
        return "Error: límit express incorrecte";
    }

    // Normalitzem el tipus d'enviament
    tipusEnviament = tipusEnviament.trim().toLowerCase();

    // Comprovem el tipus d'enviament
    if (tipusEnviament !== "standard" &&
        tipusEnviament !== "express") {

        return "Error: tipus d'enviament incorrecte";
    }

    let tempsMaxim: number = 0;

    // Recorrem tots els productes
    for (let producte of productes) {

        // Validem el temps de preparació
        if (!Number.isFinite(producte.tempsPreparacio) ||
            producte.tempsPreparacio < 0) {

            return "Error: temps de preparació incorrecte";
        }

        // Busquem el temps més gran
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
    if (tempsMaxim > limitExpress) {
        return "Error: la comanda supera el límit express";
    }

    return "La comanda arribarà en " +
        tempsMaxim + " dies (express)";
}

// Exemple d'ús
let productes: Producte[] = [
    { nom: "Ordinador", tempsPreparacio: 1.5 },
    { nom: "Ratolí", tempsPreparacio: 0 },
    { nom: "Teclat", tempsPreparacio: 2 }
];

console.log(tempsEntrega(productes, "standard", 3));
console.log(tempsEntrega(productes, " Express ", 3));
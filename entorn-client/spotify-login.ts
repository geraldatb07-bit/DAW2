interface Usuari {
    password: string;
    correu: string;
    edat: number;
}

function autentificar(usuari: Usuari): boolean {

    let correcte: boolean = false;

    if (
        usuari.correu === "correuOK" &&
        usuari.password === "passwordOK" &&
        usuari.edat > 14
    ) {
        correcte = true;
    }

    return correcte;
}

function imprimir(auth: boolean): void {

    if (auth) {
        console.log("Usuari autentificat correcte");
    } else {
        console.log("Usuari, password o edat no vàlid");
    }
}

const usuariCorrecte: Usuari = {
    password: "passwordOK",
    correu: "correuOK",
    edat: 15
}

let autoOK: boolean = autentificar(usuariCorrecte);
imprimir(autoOK);


const usuariIncorrecte: Usuari = {
    password: "passwordOK",
    correu: "correuOK",
    edat: 9
}

autoOK = autentificar(usuariIncorrecte);
imprimir(autoOK);
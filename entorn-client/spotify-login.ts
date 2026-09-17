function autentificar(correu: string, contrasenya: string, edat: number): boolean {

    const correuValid = correu.includes("@") && correu.includes(".");

    const contrasenyaValida = contrasenya.length >= 8;

    const edatValida = edat > 14;


    return correuValid && contrasenyaValida && edatValida;
}

// Exemples
console.log(autentificar("gerald@gmail.com", "contrasenya123", 18)); // true
console.log(autentificar("gerald@gmail.com", "123", 18));            // false
console.log(autentificar("gerald@gmail.com", "contrasenya123", 13)); // false
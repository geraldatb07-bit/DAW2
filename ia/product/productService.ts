import { Product } from "./prodcut";
import { isProductValid } from "./productValidator";

export class ProducteService {

    crear(product: Product): Product {
        if (!isProductValid(product)) {
            throw new Error("Producte no vàlid");
        }

        return product;
    }

    buscarPerCodi(productes: Product[], codi: number): Product | undefined {
        return productes.find((producte) => producte.id === codi);
    }
}
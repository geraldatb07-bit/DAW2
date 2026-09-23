import { Product } from "./prodcut";

export function isProductValid(product: Product): boolean {
    return product.nom.trim() !== "" && product.preu > 0;
}
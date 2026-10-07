import { Country } from "../interfaces/Country/country";
import { MAXCOUNTRY } from "../interfaces/Country/country.constants";

export function isValidCountry(country: Country): boolean {
    if (!country || !country.countryName) {
        return false;
    }

    const longCountryName: number = country.countryName.trim().replace(/\s+/g, " ").length;

    if (longCountryName === 0 || longCountryName > MAXCOUNTRY) {
        return false;
    }
    return true;
}

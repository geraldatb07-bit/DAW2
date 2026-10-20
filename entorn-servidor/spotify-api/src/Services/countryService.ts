import { randomUUID } from "crypto";
import { countries } from "../data/country/country.data";
import { tracks } from "../data/track/track.data";
import { isValidCountry } from "../validators/country.validator";
import { Country } from "../interfaces/Country/country";
import { CountryBD } from "../interfaces/Country/countryBD";
import { errorService as ErrorService } from "../interfaces/error/errorService";
import { TrackBD } from "../interfaces/track/trackBD";
import { successService as SuccessService } from "../interfaces/error/SuccessService";
import { createSuccessService } from "../interfaces/error/createSuccessService";
import { deleteSuccessService } from "../interfaces/error/deleteSuccessService";


export async function getAllCountries(): Promise<CountryBD[]> {
    return countries;
}

export async function getCountryById(id: string): Promise<CountryBD | undefined> {

    return countries.find(
        (c: CountryBD) => { return c.id === id }
    );
}

export async function createCountry(country: Country): Promise<SuccessService<CountryBD> | ErrorService> {

    if (!isValidCountry(country)) {
        return { success: false, code: 400, message: "fuck you" };
    }

    // les correctes son dades
    const uuid: string = randomUUID();

    const countryRecord: CountryBD = {
        id: uuid,
        countryName: country.countryName.trim().replace(/\s+/g, " "),

    };
    countries.push(countryRecord);

    return { success: true, data: countryRecord, code: 201 };
}

export async  function putCountry(country: CountryBD, id: string | string[]): Promise<createSuccessService<CountryBD> | ErrorService> {
    if (!isValidCountry(country)) {
        return { success: false, code: 400, message: "adeu" };
    }

    const index: number = tracks.findIndex(
        (t: TrackBD) => { return t.id === id }
    );

    if (index === -1) {
        return { success: false, code: 404, message: `Pais invalid, com tu.` };
    }

    const countryBD: CountryBD = {
        id: id as string,
        countryName: country.countryName.trim().replace(/\s+/g, " "),

    };

    return { success: true, data: countryBD, code: 201, index: index };
}

export async function deleteCountry(id: string | string[]): Promise<deleteSuccessService | ErrorService> {

    const index: number = tracks.findIndex(
        (t: TrackBD) => { return t.id === id }
    );
    if (index === -1) {
        return { success: false, code: 404, message: `Track ${id} not found lol` };
    }

    return { success: true, code: 204, index: index }
}
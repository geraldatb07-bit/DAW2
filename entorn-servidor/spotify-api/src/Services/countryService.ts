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
import sql, { ConnectionPool, IResult } from "mssql";
import { getConnection } from "../config/database";


export async function getAllCountries(): Promise<CountryBD[]> {
    const pool: ConnectionPool = await getConnection();
        const request: sql.Request = pool.request();
    
        const queryText: string = `Select * from Track`;
        const result: IResult<CountryBD> = await request.query(queryText);
        return result.recordset;
    
}

export function getCountryById(id: string): CountryBD | undefined {

    return countries.find(
        (c: CountryBD) => { return c.id === id }
    );
}

export function createCountry(country: Country): SuccessService<CountryBD> | ErrorService {

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

export function putCountry(country: CountryBD, id: string | string[]): createSuccessService<CountryBD> | ErrorService {
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

export function deleteCountry(id: string | string[]): deleteSuccessService | ErrorService {

    const index: number = tracks.findIndex(
        (t: TrackBD) => { return t.id === id }
    );
    if (index === -1) {
        return { success: false, code: 404, message: `Track ${id} not found lol` };
    }

    return { success: true, code: 204, index: index }
}
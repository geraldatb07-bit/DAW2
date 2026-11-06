import sql, { ConnectionPool, IResult, UniqueIdentifier } from "mssql";
import { getConnection } from "../config/database";
import { createSuccessService } from "../interfaces/error/createSuccessService";
import { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { errorService } from "../interfaces/error/errorService";
import { selectSuccessService } from "../interfaces/error/selectSuccesService";
import { updateSuccessService } from "../interfaces/error/updateSuccessService";
import { Country } from "../interfaces/Country/country";
import { CountryBD } from "../interfaces/Country/countryBD";
import { isValidCountry } from "../validators/country.validator";

export async function getAllCountries(): Promise<CountryBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const result: IResult<CountryBD> = await request.query(`SELECT * FROM Country`);
    return result.recordset;
}

export async function getCountryById(idCountry: string): Promise<selectSuccessService<CountryBD> | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", UniqueIdentifier, idCountry);

    const result: IResult<CountryBD> = await request.query(`SELECT * FROM Country WHERE Country.id = @id`);

    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "Country not found"
        };
    }

    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    };
}

export async function createCountry(country: Country): Promise<createSuccessService | errorService> {
    if (!isValidCountry(country)) {
        return { success: false, code: 400, message: "Invalid country data." };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText = `INSERT INTO Country(name) VALUES (@name)`;

    request.input("name", sql.NVarChar, country.countryName.trim().replace(/\s+/g, " "));
    const result: IResult<number> = await request.query(queryText);

    return {
        success: true,
        code: 201,
        data: result.rowsAffected[0]
    };
}

export async function putCountry(country: Country, idCountry: string): Promise<updateSuccessService<number> | errorService> {
    if (!isValidCountry(country)) {
        return {
            success: false,
            code: 400,
            message: "Invalid country data."
        };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText = `UPDATE Country SET name = @name WHERE id = @id`;

    request.input("name", sql.NVarChar, country.countryName.trim().replace(/\s+/g, " "));
    request.input("id", UniqueIdentifier, idCountry);

    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Country not found"
        };
    }

    return {
        success: true,
        code: 200,
        data: result.rowsAffected[0]
    };
}

export async function deleteCountry(idCountry: string): Promise<deleteSuccessService | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", UniqueIdentifier, idCountry);

    const result: IResult<CountryBD> = await request.query(`DELETE FROM Country WHERE Country.id = @id`);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Country not found"
        };
    }

    return {
        success: true,
        code: 204
    };
}

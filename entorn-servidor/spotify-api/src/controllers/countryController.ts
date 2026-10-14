import { Response, Request } from "express";
import { getCountryById, putCountry } from "../services/countryService";
import { ErrorService } from "../interfaces/error/errorService";
import { updateSuccessService } from "../interfaces/error/updateSuccessService";
import { randomUUID } from "crypto";
import { countries } from "../data/country/country.data";
import { Country } from "../interfaces/Country/country";
import { isValidCountry } from "../validators/country.validator";
import { CountryBD } from "../interfaces/Country/countryBD";

export function getAllCountryController(_req: Request, res: Response): Response {
    return res.status(200).json(countries);
}

export function getCountryByIdController(req: Request, res: Response): Response {
    const findCountry: CountryBD | undefined = getCountryById(req.params.id as string);

    if (findCountry) {
        return res.status(404).json({ message: `Track ${findCountry} not found lol` });
    }
    return res.status(200).json(findCountry);
}

export function postCountryController(req: Request, res: Response): Response {
    const country: Country = req.body;
    if (!isValidCountry(country)) {
        return res.status(400).json({ message: "Invalid data" });
    }
    const uuid: string = randomUUID();
    const countryRecord: Country = {
        id: uuid,
        countryName: country.countryName.trim()
    };

    countries.push(countryRecord);
    return res.status(201).json(countryRecord);
}

export function putCountryController(req: Request, res: Response): Response {
    const result: updateSuccessService<CountryBD> | ErrorService = putCountry(req.body, req.params.id);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as updateSuccessService<CountryBD>).index;
    countries[index] = (result as updateSuccessService<CountryBD>).data;


    return res.status(200).json(countries[index]);
}

export function deleteCountryController(req: Request, res: Response): Response {
    const result: updateSuccessService<CountryBD> | ErrorService = putCountry(req.body, req.params.id);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as updateSuccessService<CountryBD>).index;

    countries.splice(index, 1);

    return res.status(204).json({ message: `Truck delated` });
}
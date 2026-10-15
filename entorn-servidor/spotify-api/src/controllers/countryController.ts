import { Response, Request } from "express";
import { createCountry, getCountryById, putCountry } from "../services/countryService";
import { updateSuccessService } from "../interfaces/error/updateSuccessService";
import { randomUUID } from "crypto";
import { countries } from "../data/country/country.data";
import { Country } from "../interfaces/Country/country";
import { isValidCountry } from "../validators/country.validator";
import { CountryBD } from "../interfaces/Country/countryBD";
import { errorService } from "../interfaces/error/errorService";
import { successService } from "../interfaces/error/SuccessService";

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
    const result: successService<CountryBD> | errorService = createCountry(req.body);
    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    countries.push((result as successService<CountryBD>).data);
    return res.status(201).json(result);
}

export function putCountryController(req: Request, res: Response): Response {
    const result: updateSuccessService<CountryBD> | errorService = putCountry(req.body, req.params.id);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as updateSuccessService<CountryBD>).index;
    countries[index] = (result as updateSuccessService<CountryBD>).data;


    return res.status(200).json(countries[index]);
}

export function deleteCountryController(req: Request, res: Response): Response {
    const result: updateSuccessService<CountryBD> | errorService = putCountry(req.body, req.params.id);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as updateSuccessService<CountryBD>).index;

    countries.splice(index, 1);

    return res.status(204).json({ message: `Truck delated` });
}
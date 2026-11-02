import { Request, Response } from "express";
import { createCountry, deleteCountry, getAllCountries, getCountryById, putCountry } from "../Services/countryService";
import { Country } from "../interfaces/Country/country";
import { CountryBD } from "../interfaces/Country/countryBD";
import { createSuccessService } from "../interfaces/error/createSuccessService";
import { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { errorService } from "../interfaces/error/errorService";
import { selectSuccessService } from "../interfaces/error/selectSuccesService";
import { updateSuccessService } from "../interfaces/error/updateSuccessService";

export async function getAllCountriesController(_req: Request, res: Response): Promise<Response> {
    const countriesBD: CountryBD[] = await getAllCountries();
    return res.status(200).json(countriesBD);
}

export async function getCountryByIdController(req: Request, res: Response): Promise<Response> {
    const result: selectSuccessService<CountryBD> | errorService = await getCountryById(req.params.id as string);

    if (!result.success) {
        return res.status(result.code).json({ message: (result as errorService).message });
    }
    return res.status(200).json(result);
}

export async function postCountryController(req: Request, res: Response): Promise<Response> {
    const result: createSuccessService<number> | errorService = await createCountry(req.body as Country);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}

export async function putCountryController(req: Request, res: Response): Promise<Response> {
    const result: updateSuccessService<number> | errorService = await putCountry(req.body as Country, req.params.id as string);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}

export async function deleteCountryController(req: Request, res: Response): Promise<Response> {
    const result: deleteSuccessService | errorService = await deleteCountry(req.params.id as string);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).send();
}
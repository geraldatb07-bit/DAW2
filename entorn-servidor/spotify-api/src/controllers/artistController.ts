import { Request, Response } from "express";
import { createArtist, deleteArtist, getAllArtist, getArtistById, updateArtist } from "../Services/artistService";
import { Artist } from "../interfaces/artist/artist";
import { ArtistBD } from "../interfaces/artist/artistBD";
import { createSuccessService } from "../interfaces/error/createSuccessService";
import { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { errorService } from "../interfaces/error/errorService";
import { selectSuccessService } from "../interfaces/error/selectSuccesService";
import { updateSuccessService } from "../interfaces/error/updateSuccessService";

export async function getAllArtistsController(_req: Request, res: Response): Promise<Response> {
    const artistsBD: ArtistBD[] = await getAllArtist();
    return res.status(200).json(artistsBD);
}

export async function getArtistByIdController(req: Request, res: Response): Promise<Response> {
    const result: selectSuccessService<ArtistBD> | errorService = await getArtistById(req.params.id as string);

    if (!result.success) {
        return res.status(result.code).json({ message: (result as errorService).message });
    }
    return res.status(200).json(result);
}

export async function postArtistController(req: Request, res: Response): Promise<Response> {
    const result: createSuccessService<number> | errorService = await createArtist(req.body as Artist);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}

export async function putArtistController(req: Request, res: Response): Promise<Response> {
    const result: updateSuccessService<number> | errorService = await updateArtist(req.params.id as string, req.body as Artist);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}

export async function deleteArtistController(req: Request, res: Response): Promise<Response> {
    const result: deleteSuccessService | errorService = await deleteArtist(req.params.id as string);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).send();
}

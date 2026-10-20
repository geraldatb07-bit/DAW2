import { Request, Response } from "express";
import {createArtist,deleteArtist,getAllArtist,getArtistById,updateArtist} from "../services/artistService";
import type { Artist } from "../interfaces/artist/artist";
import type { ArtistBD } from "../interfaces/artist/artistBD";
import type { createSuccessService } from "../interfaces/error/createSuccessService";
import type { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import type { errorService } from "../interfaces/error/errorService";
import type { selectSuccessService } from "../interfaces/error/selectSuccesService";
import type { updateSuccessService } from "../interfaces/error/updateSuccessService";

export async function getAllArtistsController(_req: Request,res: Response): Promise<Response> {
    const artistsBD = await getAllArtist();
    return res.status(200).json(artistsBD);
}

export async function getArtistByIdController(req: Request,res: Response): Promise<Response> {
    const result: selectSuccessService<ArtistBD> | errorService =
        await getArtistById(req.params.id as string);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result);
}

export async function getPostArtistController(req: Request,res: Response): Promise<Response> {
    const result: createSuccessService<number> | errorService =
        await createArtist(req.body as Artist);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result);
}

export async function getPutArtistController(req: Request,res: Response): Promise<Response> {
    const result: updateSuccessService<number> | errorService =
        await updateArtist(req.body as Artist, req.params.id as string);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result);
}

export async function getDeleteArtistController(req: Request,res: Response): Promise<Response> {
    const result: deleteSuccessService | errorService =
        await deleteArtist(req.params.id as string);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    return res.status(result.code).send();
}

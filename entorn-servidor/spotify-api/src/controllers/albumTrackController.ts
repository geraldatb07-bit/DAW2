import { Request, Response } from "express";
import { createAlbumTrack, deleteAlbumTrack, getAllAlbumTracks, getAlbumTrackById } from "../Services/albumTrackServices";
import { AlbumTrack } from "../interfaces/albumTracks/albumTracks";
import { AlbumTrackBD } from "../interfaces/albumTracks/albumTracksBD";
import { createSuccessService } from "../interfaces/error/createSuccessService";
import { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { errorService } from "../interfaces/error/errorService";
import { selectSuccessService } from "../interfaces/error/selectSuccesService";

export async function getAllAlbumTracksController(_req: Request, res: Response): Promise<Response> {
    const albumTracksBD: AlbumTrackBD[] = await getAllAlbumTracks();
    return res.status(200).json(albumTracksBD);
}

export async function getAlbumTrackByIdController(req: Request, res: Response): Promise<Response> {
    const result: selectSuccessService<AlbumTrackBD> | errorService = await getAlbumTrackById(req.params.id as string);

    if (!result.success) {
        return res.status(result.code).json({ message: (result as errorService).message });
    }
    return res.status(200).json(result);
}

export async function postAlbumTrackController(req: Request, res: Response): Promise<Response> {
    const result: createSuccessService | errorService = await createAlbumTrack(req.body as AlbumTrack);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}

export async function deleteAlbumTrackController(req: Request, res: Response): Promise<Response> {
    const result: deleteSuccessService | errorService = await deleteAlbumTrack(req.params.id as string);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).send();
}
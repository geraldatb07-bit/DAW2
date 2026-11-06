import { Request, Response } from "express";
import { createPlaylistTrack, deletePlaylistTrack, getAllPlaylistTracks, getPlaylistTrackById } from "../Services/playlistTrackService";
import { PlaylistTrackBD } from "../interfaces/playlistTrack/playlistTracksBD";
import { createSuccessService } from "../interfaces/error/createSuccessService";
import { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { errorService } from "../interfaces/error/errorService";
import { selectSuccessService } from "../interfaces/error/selectSuccesService";

export async function getAllPlaylistTracksController(_req: Request, res: Response): Promise<Response> {
    const playlistTracksBD: PlaylistTrackBD[] = await getAllPlaylistTracks();
    return res.status(200).json(playlistTracksBD);
}

export async function getPlaylistTrackByIdController(req: Request, res: Response): Promise<Response> {
    const result: selectSuccessService<PlaylistTrackBD> | errorService = await getPlaylistTrackById(req.params.id as string);

    if (!result.success) {
        return res.status(result.code).json({ message: (result as errorService).message });
    }
    return res.status(200).json(result);
}

export async function postPlaylistTrackController(req: Request, res: Response): Promise<Response> {
    const result: createSuccessService | errorService = await createPlaylistTrack(req.body as { playlistId: string; trackId: string });

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}

export async function deletePlaylistTrackController(req: Request, res: Response): Promise<Response> {
    const result: deleteSuccessService | errorService = await deletePlaylistTrack(req.params.id as string);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).send();
}
import { Request, Response } from "express";
import { createPlaylist, deletePlaylist, getAllPlaylists, getPlaylistById, updatePlaylist } from "../Services/playlistService";
import { Playlist } from "../interfaces/Playlist/playlist";
import { PlaylistBD } from "../interfaces/Playlist/playlistBD";
import { createSuccessService } from "../interfaces/error/createSuccessService";
import { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { errorService } from "../interfaces/error/errorService";
import { selectSuccessService } from "../interfaces/error/selectSuccesService";
import { updateSuccessService } from "../interfaces/error/updateSuccessService";

export async function getAllPlaylistsController(_req: Request, res: Response): Promise<Response> {
    const playlistBD: PlaylistBD[] = await getAllPlaylists();
    return res.status(200).json(playlistBD);
}

export async function getPlaylistByIdController(req: Request, res: Response): Promise<Response> {
    const result: selectSuccessService<PlaylistBD> | errorService = await getPlaylistById(req.params.id as string);

    if (!result.success) {
        return res.status(result.code).json({ message: (result as errorService).message });
    }
    return res.status(200).json(result);
}

export async function postPlaylistController(req: Request, res: Response): Promise<Response> {
    const result: createSuccessService<number> | errorService = await createPlaylist(req.body as Playlist);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}

export async function putPlaylistController(req: Request, res: Response): Promise<Response> {
    const result: updateSuccessService<number> | errorService = await updatePlaylist(req.params.id as string, req.body as Playlist);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}

export async function deletePlaylistController(req: Request, res: Response): Promise<Response> {
    const result: deleteSuccessService | errorService = await deletePlaylist(req.params.id as string);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).send();
}
import { Request, Response } from "express";
import { PlaylistTrackBD } from "../interfaces/playlistTrack/playlistTracksBD";
import { getAllPlaylistTracks, getPlaylistTrackById } from "../services/playlistTrackService";
import { playlistTracks } from "../data/playlistTrack/playlistTracks.data";
import { errorService } from "../interfaces/error/errorService";
import { updateSuccessService } from "../interfaces/error/updateSuccessService";
import { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { SuccessService } from "../interfaces/error/SuccessService";

export function getAllPlaylistTracksController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllPlaylistTracks());
}

export function getPlaylistTrackByIdController(req: Request, res: Response): Response {
    const playlistTrack: PlaylistTrackBD | undefined = getPlaylistTrackById(req.params.id as string);
    if (!playlistTrack) {
        return res.status(404).json({ message: "PlaylistTrack not found" });
    }
    return res.status(200).json(playlistTrack);
}

export function postPlaylistTrackController(req: Request, res: Response): Response {
    const result: updateSuccessService<PlaylistTrackBD> | errorService = createPlaylistTrack(req.body);
    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    const createResult = result as SuccessService<PlaylistTrackBD>;
    playlistTracks.push(createResult.data);
    return res.status(createResult.code).json(createResult.data);
}

export function deletePlaylistTrackController(req: Request, res: Response): Response {
    const result: deleteSuccessService | errorService = deletePlaylistTrack(req.params.id as string);
    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }

    const deleteResult = result as deleteSuccessService;
    playlistTracks.splice(deleteResult.index, 1);
    return res.status(deleteResult.code).send();
}
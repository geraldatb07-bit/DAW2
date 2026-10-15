import { albumTracks } from "../data/albumTracks/albumTracks.data";
import { AlbumTrackBD } from "../interfaces/albumTracks/albumTracksBD";
import { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { errorService } from "../interfaces/error/errorService";
import { successService } from "../interfaces/error/SuccessService";
import { getAllAlbumTracks, createAlbumTrack, deleteAlbumTrack } from "../services/albumTrackServices";
import { Response, Request } from "express";

export function getAllAlbumTracksController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllAlbumTracks())
}

export function postAlbumTrackController(req: Request, res: Response): Response {
    const result: successService<AlbumTrackBD> | errorService = createAlbumTrack(req.body);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message });
    }


    albumTracks.push((result as successService<AlbumTrackBD>).data);

    return res.status(201).json(result);
}

export function deleteAlbumTrackController(req: Request, res: Response): Response {


    const result: deleteSuccessService | errorService = deleteAlbumTrack(req.body);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as deleteSuccessService).index;
    albumTracks.splice(index, 1);

    return res.status(204).json({ message: `ElbumTruck delated` });
}
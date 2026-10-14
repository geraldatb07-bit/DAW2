import { Response, Request } from "express";
import { createTrack, deleteTrack, getAllTracks, getTrackById, updateTrack } from "../interfaces/data/Services/trackService";
import { TrackBD } from "../interfaces/track/trackBD";
import { SuccessService } from "../interfaces/error/SuccessService";
import { ErrorService } from "../interfaces/error/errorService";
import { tracks } from "../data/track/track";
import { updateSuccessService } from "../interfaces/error/updateSuccessService";
import { deleteSuccessService } from "../interfaces/error/deleteSuccessService";

export function getAllTracksController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllTracks());
}

export function getTrackByIdController(req: Request, res: Response): Response {
    const findTrack: TrackBD | undefined = getTrackById(req.params.id as string);

    if (!findTrack) {
        return res.status(404).json({ message: `Track ${req.params.id} not found` })
    }
    return res.status(200).json(findTrack);
}

export function postTrackController(req: Request, res: Response): Response {
    const result: SuccessService<TrackBD> | ErrorService = createTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    tracks.push((result as SuccessService<TrackBD>).data);
    return res.status(result.code).json(result);
}

export function putTrackController(req: Request, res: Response): Response {
    const result: updateSuccessService<TrackBD> | ErrorService = updateTrack(req.params.id as string, req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    const index: number = (result as updateSuccessService<TrackBD>).index;
    tracks[index] = (result as updateSuccessService<TrackBD>).data;
    return res.status(result.code).json(result);
}

export function deleteTrackController(req: Request, res: Response): Response {
    const result: deleteSuccessService | ErrorService = deleteTrack(req.params.id as string)

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(404).json({ message: errorResult.message });
    }
    const index: number = (result as deleteSuccessService).index;
    tracks.splice(index, 1)
    return res.status(result.code).json(result)
}
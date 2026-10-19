import { Response, Request } from "express";
import { createTrack, deleteTrack, getAllTracks, getTrackById, updateTrack } from "../services/trackService";
import { TrackBD } from "../interfaces/track/trackBD";
import { createSuccessService } from "../interfaces/error/createSuccessService";
import { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { errorService } from "../interfaces/error/errorService";
import { selectSuccessService } from "../interfaces/error/selectSuccesService";
import { updateSuccessService } from "../interfaces/error/updateSuccessService";

export async function getAllTracksController(_req: Request, res: Response): Promise<Response> {
    const tracksBD: TrackBD[] = await getAllTracks();
    return res.status(200).json(tracksBD);
}

export async function getTrackByIdController(req: Request, res: Response): Promise<Response> {
    const result: selectSuccessService<TrackBD> | errorService = await getTrackById(req.params.id as string);

    if (!result.success) {
        return res.status(result.code).json({ message: (result as errorService) })
    }
    return res.status(200).json(result);
}

export async function postTrackController(req: Request, res: Response): Promise<Response> {
    const result: createSuccessService<TrackBD> | errorService = await createTrack(req.body);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}

export async function putTrackController(req: Request, res: Response): Promise<Response> {
    const result: updateSuccessService<number> | errorService = await updateTrack(req.body, req.params.id as string,);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}

export async function deleteTrackController(req: Request, res: Response): Promise<Response> {
    const result: deleteSuccessService | errorService = await deleteTrack(req.params.id as string)

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).send();
}
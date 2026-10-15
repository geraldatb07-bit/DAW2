

import { Response, Request } from "express";
import { histories } from "../data/history/history.data";
import { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { errorService } from "../interfaces/error/errorService";
import { successService } from "../interfaces/error/SuccessService";
import { HistoryBD } from "../interfaces/history/historyBD";
import { getAllHistories, getHistoryById, createHistory, putHistory, deleteHistory } from "../services/historyServices";
import { updateSuccessService } from "../interfaces/error/updateSuccessService";

export function getAllHistoriesController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllHistories());
}

export function getHistoryByIdController(req: Request, res: Response): Response {


    const findHistory: HistoryBD | undefined = getHistoryById(req.params.id as string);

    if (!findHistory) {
        return res.status(404).json({ message: `History ${findHistory} not found lol` });
    }
    return res.status(200).json(findHistory);
}

export function postHistoryController(req: Request, res: Response): Response {
    const result: successService<HistoryBD> | errorService = createHistory(req.body);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message });
    }


    histories.push((result as successService<HistoryBD>).data);
    return res.status(201).json(result);
}

export function putHistoryController(req: Request, res: Response): Response {
    const result: successService<HistoryBD> | errorService = putHistory(req.body, req.params.id);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as updateSuccessService<HistoryBD>).index;
    histories[index] = (result as updateSuccessService<HistoryBD>).data;


    return res.status(200).json(result);
}

export function deleteHistoryController(req: Request, res: Response): Response {

    const result: deleteSuccessService | errorService = deleteHistory(req.params.id as string);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as deleteSuccessService).index;
    histories.splice(index, 1);

    return res.status(204).json({ message: `His story delated` });
}
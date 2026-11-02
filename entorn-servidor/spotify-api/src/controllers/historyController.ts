import { Request, Response } from "express";
import { createHistory, deleteHistory, getAllHistories, getHistoryById, putHistory } from "../Services/historyServices";
import { History } from "../interfaces/History/history";
import { HistoryBD } from "../interfaces/History/historyBD";
import { createSuccessService } from "../interfaces/error/createSuccessService";
import { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { errorService } from "../interfaces/error/errorService";
import { selectSuccessService } from "../interfaces/error/selectSuccesService";
import { updateSuccessService } from "../interfaces/error/updateSuccessService";

export async function getAllHistoriesController(_req: Request, res: Response): Promise<Response> {
    const historiesBD: HistoryBD[] = await getAllHistories();
    return res.status(200).json(historiesBD);
}

export async function getHistoryByIdController(req: Request, res: Response): Promise<Response> {
    const result: selectSuccessService<HistoryBD> | errorService = await getHistoryById(req.params.id as string);

    if (!result.success) {
        return res.status(result.code).json({ message: (result as errorService).message });
    }
    return res.status(200).json(result);
}

export async function postHistoryController(req: Request, res: Response): Promise<Response> {
    const result: createSuccessService<number> | errorService = await createHistory(req.body as History);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}

export async function putHistoryController(req: Request, res: Response): Promise<Response> {
    const result: updateSuccessService<number> | errorService = await putHistory(req.body as History, req.params.id as string);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}

export async function deleteHistoryController(req: Request, res: Response): Promise<Response> {
    const result: deleteSuccessService | errorService = await deleteHistory(req.params.id as string);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).send();
}
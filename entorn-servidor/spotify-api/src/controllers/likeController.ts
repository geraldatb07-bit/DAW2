import { Request, Response } from "express";
import { createSuccessService } from "../interfaces/error/createSuccessService";
import { errorService } from "../interfaces/error/errorService";
import { Like } from "../interfaces/Likes/like";
import { createLike } from "../Services/likeService";


export async function postLikeController(req: Request, res: Response): Promise<Response> {
    const result: createSuccessService | errorService = await createLike(req.body as Like);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}
import { Request, Response } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../services/userService";
import type { User } from "../interfaces/User/user";
import { UserBD } from "../interfaces/User/userBD";
import { errorService } from "../interfaces/error/errorService";
import { selectSuccessService } from "../interfaces/error/selectSuccesService";
import { TrackBD } from "../interfaces/track/trackBD";
import { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { updateSuccessService } from "../interfaces/error/updateSuccessService";
import { createSuccessService } from "../interfaces/error/createSuccessService";

export async function getAllUsersController(_req: Request, res: Response): Promise<Response> {
    const usersBD: UserBD[] = await getAllUsers();
    return res.status(200).json(usersBD);
}

export async function getUserByIdController(req: Request, res: Response): Promise<Response> {
    const result: selectSuccessService<UserBD> | errorService = await getUserById(req.params.id as string);

    if (!result.success) {
        return res.status(result.code).json({ message: (result as errorService) })
    }
    return res.status(200).json(result);
}

export async function postUserController(req: Request, res: Response): Promise<Response> {
    const result: createSuccessService<UserBD> | errorService = await createUser(req.body);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(200).json(result);
}

export async function putUserController(req: Request, res: Response): Promise<Response> {
    const result: updateSuccessService<number> | errorService = await updateUser(req.body);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}

export async function deleteUserController(req: Request, res: Response): Promise<Response> {
    const result: deleteSuccessService | errorService = await deleteUser(req.params.id as string)

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).send();
}

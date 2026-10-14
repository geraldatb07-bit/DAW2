import { Request, Response } from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    putUser
} from "../Services/userService";
import type { User } from "../interfaces/User/user";

export function getAllUsersController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllUsers());
}

export function getUserByIdController(req: Request, res: Response): Response {
    const id = req.params.id;
    if (typeof id !== "string") {
        return res.status(400).json({ message: "Invalid user id." });
    }
    const user = getUserById(id);
    if (!user) {
        return res.status(404).json({ message: `User ${id} not found` });
    }
    return res.status(200).json(user);
}

export function getPostUserController(req: Request, res: Response): Response {
    const result = createUser(req.body as User);
    return res.status(result.code).json(result);
}

export function getPutUserController(req: Request, res: Response): Response {
    const id = req.params.id;
    if (typeof id !== "string") {
        return res.status(400).json({ message: "Invalid user id." });
    }
    const result = putUser(req.body as User, id);
    return res.status(result.code).json(result);
}

export function getDeleteUserController(req: Request, res: Response): Response {
    const id = req.params.id;
    if (typeof id !== "string") {
        return res.status(400).json({ message: "Invalid user id." });
    }
    const result = deleteUser(id);
    return res.status(result.code).json(result);
}

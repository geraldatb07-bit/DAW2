import { Router } from "express";
import { getAllUsersController, getDeleteUserController, getPostUserController, getPutUserController, getUserByIdController } from "../controllers/userController";

export const userRouter: Router = Router();

userRouter.get("/", getAllUsersController);
userRouter.get("/:id", getUserByIdController);
userRouter.post("/", getPostUserController);
userRouter.put("/:id", getPutUserController);
userRouter.delete("/:id", getDeleteUserController);
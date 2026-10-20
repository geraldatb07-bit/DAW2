import { Router } from "express";
import { getAllUsersController, deleteUserController, postUserController, putUserController, getUserByIdController } from "../controllers/userController";

export const userRouter: Router = Router();

userRouter.get("/", getAllUsersController);
userRouter.get("/:id", getUserByIdController);
userRouter.post("/", postUserController);
userRouter.put("/:id", putUserController);
userRouter.delete("/:id", deleteUserController);
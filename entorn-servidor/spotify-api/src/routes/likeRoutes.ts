import { Router } from "express";
import { postLikeController } from "../controllers/likeController";

export const likeRouter: Router = Router();

likeRouter.post("/", postLikeController);
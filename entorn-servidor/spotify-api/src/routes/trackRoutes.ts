import { Router } from "express";
import { deleteTrackController, getAllTracksController, getTrackByIdController, postTrackController, putTrackController } from "../controllers/trackController";

export const trackRouter: Router = Router();

trackRouter.get("/", getAllTracksController)
trackRouter.get("/:id", getTrackByIdController)
trackRouter.get("/", postTrackController)
trackRouter.get("/:id", putTrackController)
trackRouter.get("/:id", deleteTrackController)

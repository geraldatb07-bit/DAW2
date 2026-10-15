import { Router } from "express";
import { deleteAlbumTrackController, getAllAlbumTracksController, postAlbumTrackController } from "../controllers/albumTrackController";

export const albumTrackRouter: Router = Router();

albumTrackRouter.get("/", getAllAlbumTracksController);
albumTrackRouter.post("/", postAlbumTrackController);
albumTrackRouter.delete("/:id", deleteAlbumTrackController);
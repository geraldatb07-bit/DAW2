import { Router } from "express";
import { getAllPlaylistTracksController, postPlaylistTrackController, deletePlaylistTrackController } from "../controllers/playlistTracksController";

export const playlistTrackRouter: Router = Router();

playlistTrackRouter.get("/", getAllPlaylistTracksController);
playlistTrackRouter.post("/", postPlaylistTrackController);
playlistTrackRouter.delete("/:id", deletePlaylistTrackController);
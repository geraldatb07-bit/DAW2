import { Router } from "express";
import { deletePlaylistController, getAllPlaylistsController, getPlaylistByIdController, postPlaylistController, putPlaylistController } from "../controllers/playlistController";

export const playlistsRouter: Router = Router();

playlistsRouter.get("/", getAllPlaylistsController);
playlistsRouter.get("/:id", getPlaylistByIdController);
playlistsRouter.post("/", postPlaylistController);
playlistsRouter.put("/:id", putPlaylistController);
playlistsRouter.delete("/:id", deletePlaylistController);
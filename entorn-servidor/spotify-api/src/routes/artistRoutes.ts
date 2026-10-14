import { Router } from "express";
import { getAllArtistsController, getDeleteArtistController, getPostArtistController, getPutArtistController, getArtistByIdController } from "../controllers/artistController";

export const artistRouter: Router = Router();

artistRouter.get("/", getAllArtistsController);
artistRouter.get("/:id", getArtistByIdController);
artistRouter.post("/", getPostArtistController);
artistRouter.put("/:id", getPutArtistController);
artistRouter.delete("/:id", getDeleteArtistController);
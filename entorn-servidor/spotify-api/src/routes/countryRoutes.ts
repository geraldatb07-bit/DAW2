import { Router } from "express";
import { getAllCountryesController, getPostUserController, getPutUserController } from "../controllers/countryController";

export const countryRouter: Router = Router();

countryRouter.get("/", getAllCountryesController);
countryRouter.post("/", getPostUserController);
countryRouter.put("/:id", getPutUserController);
import { Router } from "express";
import { getAllCountryController, postCountryController, putCountryController } from "../controllers/countryController";

export const countryRouter: Router = Router();

countryRouter.get("/", getAllCountryController);
countryRouter.post("/", postCountryController);
countryRouter.put("/:id", putCountryController);
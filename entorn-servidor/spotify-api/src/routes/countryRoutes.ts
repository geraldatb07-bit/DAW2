import { Router } from "express";
import { getAllCountriesController, postCountryController, putCountryController } from "../controllers/countryController";

export const countryRouter: Router = Router();

countryRouter.get("/", getAllCountriesController);
countryRouter.post("/", postCountryController);
countryRouter.put("/:id", putCountryController);
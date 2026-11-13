import { Router } from "express";
import { deleteHistoryController, getAllHistoriesController, getHistoryByIdController, postHistoryController } from "../controllers/historyController";

export const historyRouter: Router = Router();

historyRouter.get("/", getAllHistoriesController);
historyRouter.get("/:id", getHistoryByIdController);
historyRouter.post("/", postHistoryController);
historyRouter.delete("/:id", deleteHistoryController);
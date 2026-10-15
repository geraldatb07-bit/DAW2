import { Router } from "express";
import { deleteHistoryController, getAllHistoriesController, getHistoryByIdController, postHistoryController, putHistoryController } from "../controllers/historyController";

export const historyRouter: Router = Router();

historyRouter.get("/", getAllHistoriesController);
historyRouter.get("/:id", getHistoryByIdController);
historyRouter.post("/", postHistoryController);
historyRouter.put("/:id", putHistoryController);
historyRouter.delete("/:id", deleteHistoryController);
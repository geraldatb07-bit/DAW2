import cors from "cors";
import { APICONFIG } from "./config/apiConfig";
import express, { Express, Request, Response } from "express";
import { trackRouter } from "./routes/trackRoutes";
import { corsOptions } from "./config/cors";

export const app: Express = express();
app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (_req: Request, res: Response) => {
    return res.json(JSON.stringify(APICONFIG));
});

app.use("/tracks", trackRouter);
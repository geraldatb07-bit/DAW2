import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig.js";
import { tracks } from "./data/track/track.js";
import { Track } from "./interfaces/data/track.js";

const app: Express = express();

app.get("/", (_req: Request, res: Response) => {
    return res.json(APICONFIG);
});

app.get("/tracks/:id", (req: Request, res: Response) => {
    const idTrack: string = req.params.id as string;
    const track: Track[] = tracks.filter((t: Track) => t.id === idTrack);
    return res.status(200).json(track);
});

app.listen(APICONFIG.port, APICONFIG.host, () => {
    console.log(`Servidor escoltant a http://${APICONFIG.host}:${APICONFIG.port}`);
});
import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig.js";
import { tracks } from "./data/track/track.js";
import { Track } from "./interfaces/data/track.js";
import { isValidTrack } from "./validators/track.validator.js";
import { randomUUID } from "crypto";
import { TrackBD } from "./interfaces/track/trackBD.js";
const app: Express = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    return res.json(JSON.stringify(APICONFIG));
});

app.get("/tracks", (_req: Request, res: Response) => {
    return res.status(200).json(tracks);
});

app.get("/tracks/:id", (req: Request, res: Response) => {
    const idTrack: string = req.params.id as string;

    const track: Track[] = tracks.filter(
        (t: Track) => { return t.id === idTrack }
    );
    if (track.length === 0) {
        return res.status(404).json({ message: `Track ${idTrack} not found` })
    }
    return res.status(200).json(track);
});



app.post("/tracks", (req: Request, res: Response) => {
    const track: Track = req.body;
    if (!isValidTrack(track)) {
        return res.status(400).json({ message: "Invalid data" })
    }
    const uuid: string = randomUUID();
    const trackRecord: TrackBD = {
        id: uuid,
        title: track.title.trim().replace(/\s+/g, " "),
        artist: track.artist.trim().replace(/\s+/g, " "),
        duration: track.duration
    };


    return res.status(201).json(trackRecord);
});


app.listen(APICONFIG.port, APICONFIG.host, () => {
    console.log(`Servidor escoltant a http://${APICONFIG.host}:${APICONFIG.port}`);
});
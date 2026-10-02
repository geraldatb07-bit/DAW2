"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiConfig_js_1 = require("./config/apiConfig.js");
const track_js_1 = require("./data/track/track.js");
const track_validator_js_1 = require("./validators/track.validator.js");
const crypto_1 = require("crypto");
const artist_validador_js_1 = require("./validators/artist.validador.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    return res.json(JSON.stringify(apiConfig_js_1.APICONFIG));
});
app.get("/tracks", (_req, res) => {
    return res.status(200).json(track_js_1.tracks);
});
app.get("/tracks/:id", (req, res) => {
    const idTrack = req.params.id;
    const track = track_js_1.tracks.filter((t) => { return t.id === idTrack; });
    if (track.length === 0) {
        return res.status(404).json({ message: `Track ${idTrack} not found` });
    }
    return res.status(200).json(track);
});
app.post("/tracks", (req, res) => {
    const track = req.body;
    if (!(0, track_validator_js_1.isValidTrack)(track)) {
        return res.status(400).json({ message: "Invalid data" });
    }
    const uuid = (0, crypto_1.randomUUID)();
    const trackRecord = {
        id: uuid,
        title: track.title.trim().replace(/\s+/g, " "),
        artist: track.artist.trim().replace(/\s+/g, " "),
        duration: track.duration
    };
    track_js_1.tracks.push(trackRecord);
    return res.status(201).json(trackRecord);
});
const artists = [];
app.post("/artists", (req, res) => {
    const artist = req.body;
    if (!(0, artist_validador_js_1.isValidArtist)(artist)) {
        return res.status(400).json({ message: "Invalid data" });
    }
    const uuid = (0, crypto_1.randomUUID)();
    const artistRecord = {
        id: uuid,
        pseudonim: artist.pseudonim.trim().replace(/\s+/g, " "),
        nom: artist.nom.trim().replace(/\s+/g, " "),
        pais: artist.pais
    };
    artists.push(artist);
    return res.status(201).json(artists);
});
app.get("/artists", (_req, res) => {
    return res.status(200).json(artists);
});
app.listen(apiConfig_js_1.APICONFIG.port, apiConfig_js_1.APICONFIG.host, () => {
    console.log(`Servidor escoltant a http://${apiConfig_js_1.APICONFIG.host}:${apiConfig_js_1.APICONFIG.port}`);
});

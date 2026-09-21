"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiConfig_js_1 = require("./config/apiConfig.js");
const track_js_1 = require("./data/track/track.js");
const app = (0, express_1.default)();
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
app.listen(apiConfig_js_1.APICONFIG.port, apiConfig_js_1.APICONFIG.host, () => {
    console.log(`Servidor escoltant a http://${apiConfig_js_1.APICONFIG.host}:${apiConfig_js_1.APICONFIG.port}`);
});

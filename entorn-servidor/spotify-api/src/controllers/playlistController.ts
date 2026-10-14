import { Request, Response } from "express";
import { createPlaylist, deletePlaylist, getAllPlaylists, getPlaylistById, updatePlaylist } from "../services/playlistService";
import type { PlaylistBD } from "../interfaces/playlist/playlistBD";

export function getAllPlaylistsController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllPlaylists());
}

export function getPlaylistByIdController(req: Request, res: Response): Response {
    const id = req.params.id;
    if (typeof id !== "string") {
        return res.status(400).json({ message: "Invalid playlist id." });
    }
    const playlist = getPlaylistById(id);
    if (!playlist) {
        return res.status(404).json({ message: `Playlist ${id} not found` });
    }
    return res.status(200).json(playlist);
}

export function postPlaylistController(req: Request, res: Response): Response {
    const result = createPlaylist(req.body as PlaylistBD);
    return res.status(result.code).json(result);
}

export function putPlaylistController(req: Request, res: Response): Response {
    const id = req.params.id;
    if (typeof id !== "string") {
        return res.status(400).json({ message: "Invalid playlist id." });
    }
    const result = updatePlaylist(id, req.body as PlaylistBD);
    return res.status(result.code).json(result);
}

export function deletePlaylistController(req: Request, res: Response): Response {
    const id = req.params.id;
    if (typeof id !== "string") {
        return res.status(400).json({ message: "Invalid playlist id." });
    }
    const result = deletePlaylist(id);
    return res.status(result.code).json(result);
}

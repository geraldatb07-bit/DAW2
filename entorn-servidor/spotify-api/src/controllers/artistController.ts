import { Request, Response } from "express";
import { createArtist, deleteArtist, getAllArtist, getArtistById, updateArtist }
    from "../Services/artistService";
import type { Artist } from "../interfaces/artist/artist";

export function getAllArtistsController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllArtist());
}

export function getArtistByIdController(req: Request, res: Response): Response {
    const id = req.params.id;
    if (typeof id !== "string") {
        return res.status(400).json({ message: "Invalid artist id." });
    }
    const artist = getArtistById(id);
    if (!artist) {
        return res.status(404).json({ message: `Artist ${id} not found` });
    }
    return res.status(200).json(artist);
}

export function getPostArtistController(req: Request, res: Response): Response {
    const result = createArtist(req.body as Artist);
    return res.status(result.code).json(result);
}

export function getPutArtistController(req: Request, res: Response): Response {
    const id = req.params.id;
    if (typeof id !== "string") {
        return res.status(400).json({ message: "Invalid artist id." });
    }
    const result = updateArtist(id, req.body as Artist);
    return res.status(result.code).json(result);
}

export function getDeleteArtistController(req: Request, res: Response): Response {
    const id = req.params.id;
    if (typeof id !== "string") {
        return res.status(400).json({ message: "Invalid artist id." });
    }
    const result = deleteArtist(id);
    return res.status(result.code).json(result);
}

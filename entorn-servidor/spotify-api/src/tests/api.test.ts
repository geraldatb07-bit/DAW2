// Runtime validation coverage for: active HTTP routes and controller responses
import express from "express";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import type { Server } from "node:http";
import { albumTrackRouter } from "../routes/albumTrackRoutes";
import { historyRouter } from "../routes/historyRoutes";
import { isValidArtist } from "../validators/artist.validator";

const serviceMocks = vi.hoisted(() => ({
    getAllTracks: vi.fn(),
    getTrackById: vi.fn(),
    createTrack: vi.fn(),
    updateTrack: vi.fn(),
    deleteTrack: vi.fn(),
    getAllArtist: vi.fn(),
    getArtistById: vi.fn(),
    createArtist: vi.fn(),
    updateArtist: vi.fn(),
    deleteArtist: vi.fn(),
    getAllUsers: vi.fn(),
    getUserById: vi.fn(),
    createUser: vi.fn(),
    updateUser: vi.fn(),
    deleteUser: vi.fn(),
    createCountry: vi.fn(),
    getCountryById: vi.fn(),
    putCountry: vi.fn(),
    getAllPlaylists: vi.fn(),
    getPlaylistById: vi.fn(),
    createPlaylist: vi.fn(),
    updatePlaylist: vi.fn(),
    deletePlaylist: vi.fn(),
    getAllPlaylistTracks: vi.fn(),
    createPlaylistTrack: vi.fn(),
    deletePlaylistTrack: vi.fn(),
    getAllHistories: vi.fn(),
    getHistoryById: vi.fn(),
    createHistory: vi.fn(),
    putHistory: vi.fn(),
    deleteHistory: vi.fn(),
    getAllAlbumTracks: vi.fn(),
    createAlbumTrack: vi.fn(),
    deleteAlbumTrack: vi.fn(),
}));

vi.mock("../src/services/trackService", () => ({
    getAllTracks: serviceMocks.getAllTracks,
    getTrackById: serviceMocks.getTrackById,
    createTrack: serviceMocks.createTrack,
    updateTrack: serviceMocks.updateTrack,
    deleteTrack: serviceMocks.deleteTrack,
}));
vi.mock("../services/artistService", () => ({
    getAllArtist: serviceMocks.getAllArtist,
    getArtistById: serviceMocks.getArtistById,
    createArtist: serviceMocks.createArtist,
    updateArtist: serviceMocks.updateArtist,
    deleteArtist: serviceMocks.deleteArtist,
}));
vi.mock("../src/services/userService", () => ({
    getAllUsers: serviceMocks.getAllUsers,
    getUserById: serviceMocks.getUserById,
    createUser: serviceMocks.createUser,
    updateUser: serviceMocks.updateUser,
    deleteUser: serviceMocks.deleteUser,
}));
vi.mock("../src/services/countryService", () => ({
    createCountry: serviceMocks.createCountry,
    getCountryById: serviceMocks.getCountryById,
    putCountry: serviceMocks.putCountry,
}));
vi.mock("../src/services/playlistService", () => ({
    getAllPlaylists: serviceMocks.getAllPlaylists,
    getPlaylistById: serviceMocks.getPlaylistById,
    createPlaylist: serviceMocks.createPlaylist,
    updatePlaylist: serviceMocks.updatePlaylist,
    deletePlaylist: serviceMocks.deletePlaylist,
}));
vi.mock("../src/services/playlistTrackService", () => ({
    getAllPlaylistTracks: serviceMocks.getAllPlaylistTracks,
    createPlaylistTrack: serviceMocks.createPlaylistTrack,
    deletePlaylistTrack: serviceMocks.deletePlaylistTrack,
}));
vi.mock("../src/services/historyServices", () => ({
    getAllHistories: serviceMocks.getAllHistories,
    getHistoryById: serviceMocks.getHistoryById,
    createHistory: serviceMocks.createHistory,
    putHistory: serviceMocks.putHistory,
    deleteHistory: serviceMocks.deleteHistory,
}));
vi.mock("../src/services/albumTrackServices", () => ({
    getAllAlbumTracks: serviceMocks.getAllAlbumTracks,
    createAlbumTrack: serviceMocks.createAlbumTrack,
    deleteAlbumTrack: serviceMocks.deleteAlbumTrack,
}));

import { app } from "../appSpoty";

const track = { id: "track-1", title: "Example track", artist: "artist-1", duration: 180 };
const artist = { id: "artist-1", nom: "Example artist", pseudonim: "Example", pais: { countryName: "França" } };
const user = { id: "user-1", email: "user@example.com", country: { countryName: "França" } };
const playlist = { id: "playlist-1", title: "Example playlist", user };

let server: Server;
let baseUrl: string;

beforeAll(async () => {
    const testApp = express();
    testApp.use(app);
    testApp.use("/history", historyRouter);
    testApp.use("/albumtracks", albumTrackRouter);
    server = testApp.listen(0, "127.0.0.1");
    await new Promise<void>((resolve, reject) => {
        server.once("listening", resolve);
        server.once("error", reject);
    });

    const address = server.address();
    if (!address || typeof address === "string") {
        throw new Error("The test server did not bind to a TCP port.");
    }
    baseUrl = `http://127.0.0.1:${address.port}`;
});

afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
        server.close((error) => error ? reject(error) : resolve());
    });
});

beforeEach(() => {
    vi.resetAllMocks();
    serviceMocks.getAllTracks.mockResolvedValue([track]);
    serviceMocks.getTrackById.mockResolvedValue({ success: true, code: 200, data: track });
    serviceMocks.createTrack.mockResolvedValue({ success: false, code: 400, message: "Invalid data." });
    serviceMocks.updateTrack.mockResolvedValue({ success: false, code: 404, message: "Track not found" });
    serviceMocks.deleteTrack.mockResolvedValue({ success: false, code: 404, message: "Track not found" });

    serviceMocks.getAllArtist.mockResolvedValue([artist]);
    serviceMocks.getArtistById.mockReturnValue(artist);
    serviceMocks.createArtist.mockReturnValue({ success: false, code: 400, message: "Invalid data." });
    serviceMocks.updateArtist.mockReturnValue({ success: false, code: 404, message: "Artist not found" });
    serviceMocks.deleteArtist.mockReturnValue({ success: false, code: 404, message: "Artist not found" });

    serviceMocks.getAllUsers.mockResolvedValue([user]);
    serviceMocks.getUserById.mockResolvedValue({ success: true, code: 200, data: user });
    serviceMocks.createUser.mockResolvedValue({ success: false, code: 400, message: "Invalid data." });
    serviceMocks.updateUser.mockResolvedValue({ success: false, code: 404, message: "User not found" });
    serviceMocks.deleteUser.mockResolvedValue({ success: false, code: 404, message: "User not found" });

    serviceMocks.createCountry.mockReturnValue({ success: false, code: 400, message: "Invalid data." });
    serviceMocks.getCountryById.mockReturnValue(undefined);
    serviceMocks.putCountry.mockReturnValue({ success: false, code: 404, message: "Country not found" });

    serviceMocks.getAllPlaylists.mockReturnValue([playlist]);
    serviceMocks.getPlaylistById.mockReturnValue(playlist);
    serviceMocks.createPlaylist.mockReturnValue({ success: false, code: 400, message: "Invalid data." });
    serviceMocks.updatePlaylist.mockReturnValue({ success: false, code: 404, message: "Playlist not found" });
    serviceMocks.deletePlaylist.mockReturnValue({ success: false, code: 404, message: "Playlist not found" });

    serviceMocks.getAllPlaylistTracks.mockReturnValue([]);
    serviceMocks.createPlaylistTrack.mockReturnValue({ success: false, code: 400, message: "Invalid data." });
    serviceMocks.deletePlaylistTrack.mockReturnValue({ success: false, code: 404, message: "PlaylistTrack not found" });

    serviceMocks.getAllHistories.mockReturnValue([]);
    serviceMocks.getHistoryById.mockReturnValue(undefined);
    serviceMocks.createHistory.mockReturnValue({ success: false, code: 400, message: "Invalid data." });
    serviceMocks.putHistory.mockReturnValue({ success: false, code: 404, message: "History not found" });
    serviceMocks.deleteHistory.mockReturnValue({ success: false, code: 404, message: "History not found" });

    serviceMocks.getAllAlbumTracks.mockReturnValue([]);
    serviceMocks.createAlbumTrack.mockReturnValue({ success: false, code: 400, message: "Invalid data." });
    serviceMocks.deleteAlbumTrack.mockReturnValue({ success: false, code: 404, message: "AlbumTrack not found" });
});

async function request(path: string, method = "GET", body?: unknown) {
    const response = await fetch(`${baseUrl}${path}`, {
        method,
        headers: body === undefined ? undefined : { "Content-Type": "application/json" },
        body: body === undefined ? undefined : JSON.stringify(body),
    });
    const contentType = response.headers.get("content-type") ?? "";
    const payload = response.status === 204
        ? undefined
        : contentType.includes("application/json")
            ? await response.json()
            : await response.text();
    return { response, payload };
}

describe("API entry point and read routes", () => {
    it("accepts artist data with a known country", () => {
        expect(isValidArtist({
            nom: "Example artist",
            pseudonim: "Example",
            pais: { countryName: "França" }
        })).toBe(true);
    });

    it("returns the API configuration as JSON", async () => {
        const { response, payload } = await request("/");

        expect(response.status).toBe(200);
        expect(payload).toMatchObject({ name: "API Spotify", port: 3000, status: "ok" });
    });

    it.each([
        ["/tracks", [track]],
        ["/tracks/track-1", { success: true, code: 200, data: track }],
        ["/artists", [artist]],
        ["/artists/artist-1", artist],
        ["/users", [user]],
        ["/users/user-1", { success: true, code: 200, data: user }],
        ["/playlists", [playlist]],
        ["/playlists/playlist-1", playlist],
        ["/playlisttracks", []],
    ])("GET %s returns its service data", async (path, expected) => {
        const { response, payload } = await request(path);

        expect(response.status).toBe(200);
        expect(payload).toEqual(expected);
        if (path === "/users") {
            expect(serviceMocks.getAllUsers).toHaveBeenCalledOnce();
        }
    });

    it("lists the country fixtures without requiring a database", async () => {
        const { response, payload } = await request("/countries");

        expect(response.status).toBe(200);
        expect(payload).toEqual(expect.arrayContaining([
            expect.objectContaining({ countryName: "França" }),
        ]));
    });

    it("returns 404 for an unregistered route", async () => {
        const { response } = await request("/not-a-route");

        expect(response.status).toBe(404);
    });
});

describe("resource write routes", () => {
    it.each([
        ["/tracks", "POST", serviceMocks.createTrack, 400],
        ["/tracks/track-1", "PUT", serviceMocks.updateTrack, 404],
        ["/tracks/track-1", "DELETE", serviceMocks.deleteTrack, 404],
        ["/artists", "POST", serviceMocks.createArtist, 400],
        ["/artists/artist-1", "PUT", serviceMocks.updateArtist, 404],
        ["/artists/artist-1", "DELETE", serviceMocks.deleteArtist, 404],
        ["/users", "POST", serviceMocks.createUser, 400],
        ["/users/user-1", "PUT", serviceMocks.updateUser, 404],
        ["/users/user-1", "DELETE", serviceMocks.deleteUser, 404],
        ["/countries", "POST", serviceMocks.createCountry, 400],
        ["/countries/country-1", "PUT", serviceMocks.putCountry, 404],
        ["/playlists", "POST", serviceMocks.createPlaylist, 400],
        ["/playlists/playlist-1", "PUT", serviceMocks.updatePlaylist, 404],
        ["/playlists/playlist-1", "DELETE", serviceMocks.deletePlaylist, 404],
        ["/playlisttracks", "POST", serviceMocks.createPlaylistTrack, 400],
        ["/playlisttracks/playlist-track-1", "DELETE", serviceMocks.deletePlaylistTrack, 404],
    ])("%s %s forwards service validation/not-found responses", async (path, method, service, expectedStatus) => {
        const { response } = await request(path, method, {});

        expect(response.status).toBe(expectedStatus);
        expect(service).toHaveBeenCalledOnce();
    });
});

describe("routers not mounted by the application yet", () => {
    it.each([
        ["/history", []],
        ["/albumtracks", []],
    ])("GET %s responds through its exported router", async (path, expected) => {
        const { response, payload } = await request(path);

        expect(response.status).toBe(200);
        expect(payload).toEqual(expected);
    });

    it("returns not found for a missing history", async () => {
        const { response } = await request("/history/history-1");

        expect(response.status).toBe(404);
    });

    it.each([
        ["/history", "POST", serviceMocks.createHistory, 400],
        ["/history/history-1", "PUT", serviceMocks.putHistory, 404],
        ["/history/history-1", "DELETE", serviceMocks.deleteHistory, 404],
        ["/albumtracks", "POST", serviceMocks.createAlbumTrack, 400],
        ["/albumtracks/album-track-1", "DELETE", serviceMocks.deleteAlbumTrack, 404],
    ])("%s %s forwards service validation/not-found responses", async (path, method, service, expectedStatus) => {
        const { response } = await request(path, method, {});

        expect(response.status).toBe(expectedStatus);
        expect(service).toHaveBeenCalledOnce();
    });
});

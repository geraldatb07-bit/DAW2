export const playlistTracksRouter: Router = Router();

playlistTracksRouter.get("/", getAllPlaylistTracksController);
playlistTracksRouter.get("/:id", getPlaylistTrackByIdController);
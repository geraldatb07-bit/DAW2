import { ApiConfig } from "../interfaces/apiConfig";

export const APICONFIG: ApiConfig = {
    name: "API Spotify",
    description: "Manage Spotifiy functionality",
    host: "localhost",
    port: 3000,
    status: "ok",
    version: {
        major: 1,
        minor: 0,
        patch: 0
    },
    resources: [
        {
            name: "Root",
            endPoint: "/"
        },
        {
            name: "Track (songs",
            endPoint: "GET /tracks"
        }
    ],
}
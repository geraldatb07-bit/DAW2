// Runtime validation coverage for: client app and song-card rendering
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import SongCard from "../components/songs/SongCard";

afterEach(() => {
    vi.restoreAllMocks();
});

describe("SongCard", () => {
    it("shows the supplied song details", () => {
        const markup = renderToStaticMarkup(
            <SongCard
                trackInfo={{
                    title: "Test song",
                    artist: "Test artist",
                    duration: 123,
                    reproduccions: 456,
                }}
            />,
        );

        expect(markup).toContain("Títol: Test song");
        expect(markup).toContain("Artist: Test artist");
        expect(markup).toContain("Duration: 123");
        expect(markup).toContain("Total Reproduccions: 456");
    });
});

describe("App", () => {
    it("renders a track, a user, and the current-date label", () => {
        vi.spyOn(Math, "random").mockReturnValue(0);

        const markup = renderToStaticMarkup(<App />);

        expect(markup).toContain("Spotify Songs");
        expect(markup).toContain("Usuari: Tumbaco");
        expect(markup).toContain("Data:");
        expect(markup).toContain("Títol: Nights like this");
        expect(markup).toContain("Artist: KidLaroi");
        expect(markup).toContain("Duration: 165");
        expect(markup).toContain("Total Reproduccions: 0");
    });
});

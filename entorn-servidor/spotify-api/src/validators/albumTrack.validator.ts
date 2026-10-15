import { albums } from "../data/album/album.data";
import { tracks } from "../data/track/track.data";
import { AlbumBD } from "../interfaces/album/albumBD";
import { AlbumTrack } from "../interfaces/albumTracks/albumTracks";
import { MAXARTIST, MAXTITOL } from "../interfaces/track/track.constants";
import { TrackBD } from "../interfaces/track/trackBD";


export function isValidAlbumTrack(ATrack: AlbumTrack): boolean {
    if (!ATrack) {
        return false;
    }

    if (ATrack.album === null || ATrack.track === null) {
        return false
    }



    const longArtistName: number = ATrack.album.trim().replace(/\s+/g, " ").length;
    const longRealName: number = ATrack.track.trim().replace(/\s+/g, " ").length;

    const dadesOK: boolean = longArtistName > 0 && longArtistName <= MAXARTIST
        && longRealName > 0 && longRealName <= MAXTITOL;

    if (!dadesOK) {
        return false;
    }

    const AlbumOK: AlbumBD | undefined = albums.find(
        (c: AlbumBD) => { return c.id === ATrack.album }
    );

    if (!AlbumOK) return false;

    const TrackOK: TrackBD | undefined = tracks.find(
        (c: TrackBD) => { return c.id === ATrack.track }
    );

    if (!TrackOK) return false;

    return true;

}
import { tracks } from "../data/track/track.data";
import { users } from "../data/user/user.data";
import { MAXARTIST, MAXTITOL } from "../interfaces/track/track.constants";
import { TrackBD } from "../interfaces/track/trackBD";
import { UserBD } from "../interfaces/User/userBD";
import { History } from "../interfaces/history/history";


export function isValidHistory(history: History): boolean {
    if (!history) {
        return false;
    }

    if (history.user === null || history.track === null || history.data === null) {
        return false
    }



    const longArtistName: number = history.user.trim().replace(/\s+/g, " ").length;
    const longRealName: number = history.track.trim().replace(/\s+/g, " ").length;

    const dadesOK: boolean = longArtistName > 0 && longArtistName <= MAXARTIST
        && longRealName > 0 && longRealName <= MAXTITOL;

    if (!dadesOK) {
        return false;
    }

    const UserOK: UserBD | undefined = users.find(
        (c: UserBD) => { return c.id === history.user }
    );

    if (!UserOK) return false;

    const TrackOK: TrackBD | undefined = tracks.find(
        (c: TrackBD) => { return c.id === history.track }
    );

    if (!TrackOK) return false;

    return true;

}
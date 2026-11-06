import { History } from "../interfaces/History/history";


export function isValidHistory(history: History): boolean {
    if (!history) {
        return false;
    }

    if (!history.user || !history.track) {
        return false
    }

    return true;

}
import { Like } from "../interfaces/Likes/like";


export function isValidLike(like: Like): boolean {
    if (!like) {
        return false;
    }

    if (!like.user || !like.track) {
        return false
    }

    return true;

}
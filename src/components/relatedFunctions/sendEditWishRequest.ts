import {editWishUrl} from "../../config";

export const sendEditWishRequest = (wishId: string, wishTitle: string, wishDescription: string, isPublic: boolean | string[]) => fetch(editWishUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    credentials: "include",
    body: JSON.stringify({
        wishId: wishId,
        title: wishTitle,
        description: wishDescription,
        isPublic: isPublic
    })
})

import {deleteWishUrl} from "../../config";


export const sendDeleteRequest = (wishId: string) => fetch(deleteWishUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    credentials: "include",
    body: JSON.stringify({
        wishId: wishId,
    })
})

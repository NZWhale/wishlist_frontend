import {addNewWishUrl} from "../../../config";


export const sendAddWishRequest = (title: string, description: string, isPublic: boolean) => fetch(addNewWishUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        credentials: "include",
        body: JSON.stringify({
            title: title,
            description: description,
            isPublic: isPublic
        })
    })

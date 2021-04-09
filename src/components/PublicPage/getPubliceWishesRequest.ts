import {getPublicWishesUrl} from "../../config";

export const getPublicWishesRequest = (username: string) => fetch(getPublicWishesUrl + username, {
    method: 'GET',
    credentials: 'include'
})
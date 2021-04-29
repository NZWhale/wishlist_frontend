import {getLoggedInUserWishesUrl} from "../../../config";

export const sendGetLoggedInUserWishesRequest = () => fetch(getLoggedInUserWishesUrl, {
    method: 'GET',
    credentials: 'include'
})
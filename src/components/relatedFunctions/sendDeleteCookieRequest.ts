import {deleteCookieUrl} from "../../config";

export const deleteCookieRequest = () => fetch(deleteCookieUrl, {
    method: 'GET',
    credentials: 'include'
})
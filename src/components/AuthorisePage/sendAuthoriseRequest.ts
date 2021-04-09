import {authRequestUrl} from "../../config";

export const sendAuthoriseRequest = (token: string) => fetch(authRequestUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8',},
    credentials: 'include',
    body: JSON.stringify({token: token})
})
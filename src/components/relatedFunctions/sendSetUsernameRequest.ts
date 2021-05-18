import {setUsernameUrl} from "../../config";

export const sendSetUsernameRequest = (username: string) => fetch(setUsernameUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    credentials: "include",
    body: JSON.stringify({username: username})
})

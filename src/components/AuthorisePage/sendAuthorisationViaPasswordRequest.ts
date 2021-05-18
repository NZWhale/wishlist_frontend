import {regularAuthorisationUrl} from "../../config";


export const sendAuthorisationViaPasswordRequest = (email: string, password: string) => fetch(regularAuthorisationUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    credentials: 'include',
    body: JSON.stringify({
        email: email,
        password: password
    })
})

import {getMagicLinkUrl} from "../../config";


export const sendRegistrationRequest = (email: string) => fetch(getMagicLinkUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify({email: email})
})

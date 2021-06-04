import {generateRecoveryLinkUrl} from "../../config";

export const sendRecoveryRequest = (email: string) => fetch(generateRecoveryLinkUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    credentials: "include",
    body: JSON.stringify({email: email})
})

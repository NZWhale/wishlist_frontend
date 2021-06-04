import {codeValidationHandlerUrl} from "../../config";

export const sendRecoveryCode = (token: string) => fetch(codeValidationHandlerUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8',},
    credentials: 'include',
    body: JSON.stringify({token: token})
})
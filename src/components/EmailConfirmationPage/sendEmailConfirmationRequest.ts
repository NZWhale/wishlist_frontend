import {emailConfirmationUrl} from "../../config";

export const sendEmailConfirmationRequest = (confirmationCode: string) => fetch(emailConfirmationUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8',},
    credentials: 'include',
    body: JSON.stringify({confirmationCode: confirmationCode})
})
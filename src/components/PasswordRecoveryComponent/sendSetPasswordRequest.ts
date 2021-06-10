import {setNewPasswordUrl} from "../../config";

export const sendSetPasswordRequest = (password: string) => fetch(setNewPasswordUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8',},
    credentials: 'include',
    body: JSON.stringify({newPassword: password})
})
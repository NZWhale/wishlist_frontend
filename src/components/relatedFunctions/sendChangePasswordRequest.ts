import {changePasswordUrl} from "../../config";

export const sendChangePasswordRequest = (oldPassword: string, newPassword: string) => fetch(changePasswordUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    credentials: "include",
    body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword
    })
})

import { registrationUrl} from "../../config";


export const sendRegistrationRequest = (email: string, password: string) => fetch(registrationUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify({
        email: email,
        password: password
    })
})

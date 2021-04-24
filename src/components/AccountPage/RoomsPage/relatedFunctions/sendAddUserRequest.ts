import { addNewUserUrl} from "../../../../config";


export const sendAddUserRequest = (email: string, roomId: string) => fetch(addNewUserUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    credentials: "include",
    body: JSON.stringify({
        email: email,
        roomId: roomId
    })
})

import { addUserViaLinkUrl} from "../../../../config";


export const sendAddUserViaLinkRequest = (roomId: string) => fetch(addUserViaLinkUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    credentials: "include",
    body: JSON.stringify({
        roomId: roomId,
    })
})

import { createNewRoomUrl} from "../../config";


export const sendCreateRoomRequest = (roomName: string) => fetch(createNewRoomUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    credentials: "include",
    body: JSON.stringify({
        roomName: roomName,
    })
})

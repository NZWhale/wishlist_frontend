import {getAllRoomsUrl} from "../../config";

export const getAllRoomsRequest = () => fetch(getAllRoomsUrl, {
    method: 'GET',
    credentials: 'include'
})

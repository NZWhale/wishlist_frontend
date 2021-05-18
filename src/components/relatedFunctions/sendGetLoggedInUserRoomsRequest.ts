import {getAllRoomsUrl} from "../../config";

export const sendGetLoggedInUserRoomsRequest = () => fetch(getAllRoomsUrl, {
    method: 'GET',
    credentials: 'include'
})
import {getUsernameByUserIdUrl} from "../../../config";


export const getUsernameByUserIdRequest = (userId: string) => fetch(getUsernameByUserIdUrl + userId, {
    method: 'GET',
    credentials: 'include'
})
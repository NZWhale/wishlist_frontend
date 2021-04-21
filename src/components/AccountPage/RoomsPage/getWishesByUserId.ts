import {getWishesByUserIdUrl} from "../../../config";


export const getWishesByUserIdRequest = (userId: string) => fetch(getWishesByUserIdUrl + userId, {
    method: 'GET',
    credentials: 'include'
})
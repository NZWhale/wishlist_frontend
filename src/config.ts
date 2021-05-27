export const host = "http://127.0.0.1"
const frontPort = 3000
const backPort = 3001

//BACKEND
export const getMagicLinkUrl: string = `${host}:${backPort}/create-magic-link`
export const authRequestUrl: string = `${host}:${backPort}/authoriseViaMagicCode`
export const getLoggedInUserWishesUrl: string = `${host}:${backPort}/getAllWishes`
export const addNewWishUrl: string = `${host}:${backPort}/addNewWish`
export const deleteWishUrl: string = `${host}:${backPort}/deleteWish`
export const editWishUrl: string = `${host}:${backPort}/modifyWish`
export const setUsernameUrl: string = `${host}:${backPort}/setUsername`
export const getUsernameUrl: string = `${host}:${backPort}/getUsername`
export const getPublicWishesUrl: string = `${host}:${backPort}/getPublicWishes/`
export const getAllRoomsUrl: string = `${host}:${backPort}/getAllRooms`
export const createNewRoomUrl: string = `${host}:${backPort}/createRoom`
export const getWishesByUserIdUrl: string = `${host}:${backPort}/getWishesById/`
export const getUsernameByUserIdUrl: string = `${host}:${backPort}/getUsernameByUserId/`
export const addNewUserUrl: string = `${host}:${backPort}/addUserToRoom`
export const addUserViaLinkUrl: string = `${host}:${backPort}/addUserViaLink`
export const registrationUrl: string = `${host}:${backPort}/registration`
export const regularAuthorisationUrl: string = `${host}:${backPort}/authorise`
export const emailConfirmationUrl: string = `${host}:${backPort}/emailConfirmation`
export const deleteCookieUrl: string = `${host}:${backPort}/deletecookie`
export const changePasswordUrl: string = `${host}:${backPort}/changePassword`

//FRONTEND
export const linkForAddingUser: string = `${host}:${frontPort}/adduser/`
export const userLink: string = `${host}:${frontPort}/user/`



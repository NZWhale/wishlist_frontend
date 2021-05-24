export const deleteCookie = () => {
    const cookieDate = new Date()
    cookieDate.setTime(cookieDate.getTime() - 1);
    document.cookie = "auth-token=; domain=127.0.0.1; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
}
export const deleteCookie = () => {
    const cookieDate = new Date()
    cookieDate.setTime(cookieDate.getTime() - 1);
    document.cookie = "auth-token=; expires=" + cookieDate.toUTCString();
}
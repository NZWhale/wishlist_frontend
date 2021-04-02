import {authRequestUrl} from "../../config";

export const sendAuthoriseRequest = (token: string) => new Promise((resolve, reject) => {
    fetch(authRequestUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({token: token})
    })
        .then(response => {
            if(response.status === 500){
                reject(new Error('Invalid credentials'))
            }
            if(response.status === 404){
                reject(new Error('Something goes wrong'))
            }
            resolve(response.status)
        })
})
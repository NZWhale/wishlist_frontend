import {getMagicLinkUrl} from "../../config";


export const sendRegistrationRequest = (email: string) => new Promise((resolve, reject) => {
    fetch(getMagicLinkUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({email: email})
    })
        .then(response => {
            if(response.status === 500){
                reject(new Error('Invalid credentials'))
            }
            if(response.status === 400){
                reject(new Error('Something goes wrong'))
            }
            resolve(response.status)
        })
})


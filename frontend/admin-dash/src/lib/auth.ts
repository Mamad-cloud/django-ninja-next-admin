'use server'
import { cookies } from "next/headers"

// TODO: sync the token age with backend 
const TOKEN_AGE = 60 * 60 // 1 hour 
const TOKEN_NAME = "access"
const TOKEN_REFRESH_NAME = "refresh"

export async function getToken(){

    // api requests
    const _cookies = await cookies()
    const myAuthToken = _cookies.get(TOKEN_NAME)
    return myAuthToken?.value
}


export async function getRefreshToken(){
    // api requests
    const _cookies = await cookies()
    const myAuthToken = _cookies.get(TOKEN_REFRESH_NAME)
    return myAuthToken?.value
}

export async function setToken(authToken: string){
    // login
    const _cookies = await cookies()
    return _cookies.set(TOKEN_NAME, authToken, {
        httpOnly: true, // limit client-side js
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        maxAge: TOKEN_AGE,
        path: '/',
    })

}

export async function setRefreshToken(authRefreshToken: string){
    // login
    const _cookies = await cookies()
    return _cookies.set(TOKEN_REFRESH_NAME, authRefreshToken, {
        httpOnly: true, // limit client-side js
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        maxAge: TOKEN_AGE,
        path: '/',
    })
}

export async function deleteTokens(){
    // logout
    const _cookies = await cookies()
    _cookies.delete(TOKEN_REFRESH_NAME)
    return _cookies.delete(TOKEN_NAME)
}
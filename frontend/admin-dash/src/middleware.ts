import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getToken, getRefreshToken, setToken, setRefreshToken } from '@/lib/auth'

import { DJANGO_API_ENDPOINT } from './config/defaults'
import ApiProxy from '@/app/api/api_proxy'

export const config = {
    matcher: ["/dashboard", "/login"]
}

async function verifyToken(token: string) {
    const response = await ApiProxy.post(`${DJANGO_API_ENDPOINT}/token/verify`, {
        token
    }, false)
    
    return response.status === 200
} 

type AuthRefreshData = {
    token: string,
    refresh: string
}

async function refreshToken(refresh: string) {
    const response = await ApiProxy.post(`${DJANGO_API_ENDPOINT}/token/refresh`, {
        refresh
    }, false)
    
    const data = response.data as AuthRefreshData
    if( response.status === 200) {
        await setToken( data.token)
        await setRefreshToken(data.refresh)
        return true
    } else return false 

} 


export async function middleware(request: NextRequest) {
    // TODO: Redirect to dashboard from home page 
    
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        // console.log(request.cookies.get("access")) 
        const token = await getToken()
        const refresh = await getRefreshToken()

        if (token) {
            const verify_res = await verifyToken(token)
            if (!verify_res && refresh) {
                // Tokens are set in the refresh function
                const refresh_res = await refreshToken(refresh)
                if (!refresh_res) return NextResponse.redirect(new URL('/login', request.url))
            } else if (!verify_res) {
                return NextResponse.redirect(new URL('/login', request.url))
            }
        } else {
            return NextResponse.redirect(new URL('/login', request.url))
        }


    }

    if (request.nextUrl.pathname.startsWith('/login')) {
        const token = await getToken();
        if (token) {
            const verify_res = await verifyToken(token);
            if (verify_res) {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
        }
    }

    return NextResponse.next()
}
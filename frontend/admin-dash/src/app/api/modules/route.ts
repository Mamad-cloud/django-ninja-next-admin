import { DJANGO_API_ENDPOINT } from "@/config/defaults"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const response = await fetch(`${DJANGO_API_ENDPOINT}/teams/modules`)

    try {
        const data = await response.json()
        if ( response.ok ) {
            return NextResponse.json({data}, {status: 200})
        }
    } catch(e) {
        return NextResponse.json({error: "cannot get modules"}, {status: 400})
    }

}
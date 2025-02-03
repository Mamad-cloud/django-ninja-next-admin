import { DJANGO_API_ENDPOINT } from "@/config/defaults"
import { NextResponse } from "next/server"
import ApiProxy from "../api_proxy"

export async function GET(request: Request) {
    const response = await ApiProxy.get(`${DJANGO_API_ENDPOINT}/teams/modules`, false)

    if( response.status === 200) {
        return NextResponse.json({data: response.data}, {status: 200})
    }else  {
        return NextResponse.json({error: "cannot get modules"}, {status: 400})
    }

}
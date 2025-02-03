import { DJANGO_API_ENDPOINT } from "@/config/defaults"
import { NextResponse } from "next/server"
import ApiProxy from "@/app/api/api_proxy"

//TODO: get products for the user's active team 
export async function GET(request: Request) {
    //const req = await request.json()
    //console.log(req)
    //const response = await ApiProxy.get(`${DJANGO_API_ENDPOINT}/teams/${req.team}/products`, true)
    const response = await ApiProxy.get(`${DJANGO_API_ENDPOINT}/teams/products`, true)
    if( response.status === 200) {
        return NextResponse.json({data: response.data}, {status: 200})
    }else  {
        return NextResponse.json({error: "cannot get products"}, {status: 400})
    }

}


export async function POST(request: Request) {
    const req = await request.json()
    console.log(req.product)

    const response = await ApiProxy.post(`${DJANGO_API_ENDPOINT}/teams/products`, req.product, true)

    if( response.status === 200) {
        return NextResponse.json({data: response.data}, {status: 200})
    }else  {
        return NextResponse.json({error: "cannot create product"}, {status: 400})
    }

}
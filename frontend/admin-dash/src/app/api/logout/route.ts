import { deleteTokens } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    await deleteTokens()
    return NextResponse.json({}, {status: 200})
}
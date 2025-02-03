'use client'

import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Flower } from "lucide-react"
import { ModeToggle } from "@/components/ui/mode-toggle"

import { useAuth } from "@/components/auth-provider"

export default function AppHeader() {
    const { isAuthenticated } = useAuth()
    return (
        <header className='w-full h-14 px-6 flex flex-row justify-center items-center gap-2 border-b'>
                <div className='flex flex-row justify-center items-center h-7 gap-2'>
                    <Flower />
                    
                    <Separator orientation='vertical' />
                    Black Rose.
                </div>
                <div className='flex grow'>

                </div>
                <Link href={isAuthenticated ? "/dashboard" : "/login"}>
                    <Button variant="outline">{isAuthenticated ? "Dashboard" : "Login"}</Button>
                </Link>
                <ModeToggle />
            </header>
    )
}
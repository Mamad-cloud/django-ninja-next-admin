
import { LoginForm } from "@/components/login-form"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted dark:bg-background p-6 md:p-10 ">
      <div className='flex flex-row w-full justify-start items-center mb-5'>
        <Link href={'/'} className='hover:bg-muted/30 rounded-full p-3'>
          <ChevronLeft />
        </Link>
      </div>
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}

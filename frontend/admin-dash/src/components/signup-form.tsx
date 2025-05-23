'use client'

import Link from "next/link"
import { Flower, ChevronLeft } from "lucide-react"

import { cn } from "@/utils/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { signup } from "@/lib/actions"
import { useActionState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import SelectedModule from "./ui/selected-module"

// TODO: check for duplicate emails and usernames every key stroke and use use-debounce 
export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  
  const { replace } = useRouter()
  const params = useSearchParams()
  
  const [state, action, pending] = useActionState(signup, undefined)
  
  let selected_modules = params.get('modules')?.split(',') as string[]

  const moduleDeleteHandler = (selected_module: string) => {
    let modules = [...selected_modules]
    modules = modules?.filter(module => module !== selected_module)
    if ( modules.length > 0)
      replace(`/signup?modules=${modules.join(',')}`)
    else replace(`/signup`)
  }

  return (

    <div className={cn("flex flex-col gap-6", className)} {...props}>
       
      <form action={action}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <Flower className="size-6" />
              </div>
              <span className="sr-only">Black Rose Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Black Rose Inc.</h1>
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4 hover:text-foreground">
                Login
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">First Name</Label>
                <Input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="John"
                  required
                  disabled={pending}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  name="lastname"
                  id="lastname"
                  type="text"
                  placeholder="Doe"
                  required
                  disabled={pending}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                name="username"
                id="username"
                type="text"
                placeholder="Dongus Humongous :)"
                required
                disabled={pending}
              />
              {state?.errors?.username && <p>{state.errors.username}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                disabled={pending}
              />
              {state?.errors?.email && <p>{state.errors.email}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                id="password"
                type="password"
                placeholder=""
                required
                disabled={pending}
              />
              {state?.errors?.password && (
                <div>
                  <p>Password must:</p>
                  <ul>
                    {state.errors.password.map((error: any) => (
                      <li key={error}>- {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {selected_modules && selected_modules.length > 0 ?
              <div className="flex flex-col gap-3 justify-center items-center">
                <Label htmlFor="modules">Selected Modules</Label>
                <Input
                  hidden
                  name="modules"
                  id="modules"
                  type="hidden"
                  value={selected_modules.join(',')}
                />

                <div className="flex flex-row flex-wrap gap-2 justify-center items-center">
                  {selected_modules.map(sm => (
                    <SelectedModule name={sm} onDelete={() => moduleDeleteHandler(sm)} key={sm} />
                  ))}
                </div>
                

              </div> : <p className="text-muted-foreground text-center">No modules were selected</p>
            }
            {state?.message && <p>{state.message}</p>}
            <Button type="submit" className="w-full" disabled={pending}>
              Sign Up
            </Button>
          </div>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                  fill="currentColor"
                />
              </svg>
              Continue with Apple
            </Button>
            <Button variant="outline" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Continue with Google
            </Button>
          </div>
        </div>
      </form>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}

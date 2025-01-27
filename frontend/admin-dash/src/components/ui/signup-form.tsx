import TextInput from "@/components/ui/text-input"
import InputSubmit from "@/components/ui/Input-submit"
import EmailInput from "@/components/ui/email-input"
import PasswordInput from "@/components/ui/password-input"

import { signup } from "@/lib/actions"
import { useActionState } from "react"

// TODO: check for duplicate emails and usernames every key stroke and use use-debounce 
export default function SignUpForm() {

    const [ state, action, pending] = useActionState(signup, undefined)
    
    return (

        <form action={action} className="flex flex-col gap-6 justify-center items-center">
            <TextInput name="username" id="username" placeholder='Username' />
            {state?.errors?.username && <p>{state.errors.username}</p>}
            <PasswordInput name="password" id="password" placeholder='Password' />
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
            <EmailInput name="email" id="email" placeholder='Email' />
            {state?.errors?.email && <p>{state.errors.email}</p>}
            {state?.message && <p>{state.message}</p>}
            <InputSubmit disabled={pending} value="Register" />
        </form>
    )
}
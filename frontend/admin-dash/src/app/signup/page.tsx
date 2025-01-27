'use client'
import Link from 'next/link';
import SignUpForm from '@/components/ui/signup-form';

export default function Page() {
    return (
        <div className="flex flex-col w-full min-h-screen justify-center items-center">
            <div className="flex flex-col gap-4 p-6 justify-center items-center border-[1px] border-neutral-300 rounded-md">
                <SignUpForm />
                <Link className="text-xs font-extralight opacity-60 hover:underline" href={"/login"}>Already have an account? Sign in!</Link>
                {/* {message && <p>{message}</p>} */}
            </div>
        </div>
    );
}
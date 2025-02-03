'use client'

import { SignupForm } from '@/components/signup-form';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
    return (
        <>

            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
                <div className='flex flex-row w-full justify-start items-center mb-10'>
                    <Link href={'/'} className='hover:bg-muted/30 rounded-full p-3'>
                        <ChevronLeft />
                    </Link>

                </div>
                <div className="w-full max-w-sm">
                    <SignupForm />
                    {/* {message && <p>{message}</p>} */}
                </div>
            </div>
        </>
    );
}

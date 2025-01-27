'use client'

import clsx from "clsx"

interface InputSubmitElementProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode
}

export default function InputSubmit({
    children,
    className,
    ...rest
}: InputSubmitElementProps) {
    return (
        <input className={clsx("mt-4 p-2 px-7 bg-blue-500 text-white rounded cursor-pointer", className)} type="submit" {...rest}/>
    )
} 
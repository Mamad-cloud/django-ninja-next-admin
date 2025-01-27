import clsx from "clsx"

interface PasswordInputElementProps extends React.InputHTMLAttributes<HTMLInputElement> {
    _children?: React.ReactNode
}

export default function TextInput({
    _children, 
    className,
    ...rest
}: PasswordInputElementProps) {

    return (
        <input type="password" className={clsx("rounded-md h-10 px-2 bg-black", className)} {...rest} /> 
    )
}
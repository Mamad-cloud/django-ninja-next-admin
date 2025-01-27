import clsx from "clsx"

interface EmailInputElementProps extends React.InputHTMLAttributes<HTMLInputElement> {
    _children?: React.ReactNode
}

export default function EmailInput({
    _children, 
    className,
    ...rest
}: EmailInputElementProps) {

    return (
        <input type="email" className={clsx("rounded-md h-10 px-2 bg-black", className)} {...rest} /> 
    )
}
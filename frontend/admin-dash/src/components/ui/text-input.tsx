import clsx from "clsx"

interface InputElementProps extends React.InputHTMLAttributes<HTMLInputElement> {
    _children?: React.ReactNode
}

export default function TextInput({
    _children, 
    className,
    ...rest
}: InputElementProps) {

    return (
        <input type="text" className={clsx("rounded-md h-10 px-2 bg-black", className)} {...rest} /> 
    )
}
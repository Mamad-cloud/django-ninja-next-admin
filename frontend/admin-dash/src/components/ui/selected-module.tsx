import { X } from "lucide-react"

export default function SelectedModule( {name, onDelete} : {name: string, onDelete: () => void }) {
    return ( 
        <div onClick={onDelete} className="flex flex-row gap-2 justify-center items-center border rounded-full py-1 pl-1 pr-3 cursor-pointer">
            <div className="flex justify-center items-center p-1  bg-muted rounded-full">
                <X width={20} height={20} />
            </div>
            <p className="text-muted-foreground select-none">{name}</p>
        </div>
    )
}
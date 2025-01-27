import { Item } from "@/lib/types";

export default function ItemEl({
    id,
    name,
    desc,
}: Readonly<Item>) {
    return (
        <div className="flex flex-col items-center py-2 w-full
                     bg-gray-700 border-b-2 rounded-md hover:bg-opacity-50
                        cursor-pointer
                     ">
            <h3 className="text-lg font-semibold select-none">{name}</h3>
            <p className="text-base select-none">{desc}</p>
        </div>
    )
}
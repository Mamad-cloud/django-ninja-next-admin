"use client";

import type { Module } from "@/lib/definitions";
import { getModuleIcon } from "@/utils/getModuleIcon"
import { cn } from "@/utils/utils";

export default function ModuleItem(module: Readonly<Module>) { 
    const Icon = getModuleIcon(module.icon)

    return (
        <div 
            onClick={module.onSelect} 
            className={cn("flex flex-col gap-2 justify-center items-center cursor-pointer transition-all duration-200 rounded-md w-[100px] h-[100px] border hover:bg-muted", module.selected ? "bg-muted": "")}
        >

            {Icon ? <Icon width={36} height={36}/> : null} {/* Ensures no error if Icon is undefined */}
            <p className="text-muted-foreground text-sm">{module.name[0].toUpperCase() + module.name.substring(1)}</p>
        </div>
    )
}

'use client'

import { ModuleBase } from "@/lib/definitions"
import ModuleItem from "@/components/module-item"
import { Separator } from "@/components/ui/separator"

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";


export default function ModuleSelector( { modules }: { modules: ModuleBase[]}) {

    const [selectedModules, setSelectedModules] = useState<string[]>([]);
   
    const toggleModule = (module_name: string) => {
        const _module_name = module_name.toLowerCase()
        let updatedModules = selectedModules.includes(_module_name)
            ? selectedModules.filter(m => m !== _module_name) // Remove if already selected
            : [...selectedModules, _module_name] // Add if not selected

        setSelectedModules(updatedModules)

        // Update URL search params
        const params = new URLSearchParams()
        if (updatedModules.length > 0) {
            params.set("modules", updatedModules.join(","))
        }
    }

    return (
        <div className="flex flex-row flex-wrap items-center w-full md:w-[75%]  gap-5 justify-center">
            {modules.length > 0 ? modules.map(module => (
                <ModuleItem 

                    icon={module.name} 
                    key={module.name} 
                    id={module.id} 
                    name={module.name} 
                    selected={selectedModules.includes(module.name.toLowerCase())}
                    onSelect={() => toggleModule(module.name)}
                />
            )) : <p className="text-muted-foreground">No modules availabe at the moment!</p>}
            
            <Separator className="w-full mt-11"/>
            <div>
                <Link href={selectedModules.length > 0 ? `/signup?modules=${selectedModules.join(',')}` : '/signup'}>
                    <Button> Continue to signup </Button>
                </Link>
            </div>
        </div>
    )
}
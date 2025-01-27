import ItemEl from '@/components/ui/item'
import { fetchItems, fetchModules } from "@/lib/actions"
import { ModeToggle } from '@/components/ui/mode-toggle'



export default async function Home() {
    const items = await fetchItems()
    const modules = await fetchModules()
    
    return (
        <div className="flex flex-col min-h-screen items-center gap-4 pt-4">
            <ModeToggle />

            <div className="flex flex-col items-center w-full px-4 gap-3">
                {modules.length > 0 ? modules.map(module => (
                    <ItemEl key={module.name} id={module.id} name={module.name} desc={module.name} />
                )) : <p>No items!</p>}
            </div>

        </div>
    );
}

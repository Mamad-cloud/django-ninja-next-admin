
// TODO: make this a server component and put the ModuleSelector into another client component

import ModuleItem from '@/components/module-item';
import { fetchModules } from "@/lib/actions"
import AppHeader from '@/components/app-header'
import { Separator } from '@/components/ui/separator';
import ModuleSelector from '@/components/module-selector';

export default async function Home() {
    const modules = await fetchModules();
    
    return (
        <div className="flex flex-col min-h-screen items-center gap-4">
            <AppHeader />

            <div className="flex flex-col items-center w-full px-6 gap-3">

                <div className='flex flex-col justify-center items-center gap-2 w-full md:w-[75%]'>
                    <h1 className="text-3xl mt-10">Select Your Modules</h1>
                    <h4 className=' text-sm text-muted-foreground'>You can change them later</h4>
                    <Separator className='mt-7 mb-4' />
                </div>


                <ModuleSelector modules={modules}/>

            </div>
        </div>
    );
}

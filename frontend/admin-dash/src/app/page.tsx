import ItemEl from "@/ui/Item";
import { fetchItems } from "@/utils/api";

export default async function Home() {
  const items = await fetchItems()
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div className="flex flex-col items-center w-full px-4 gap-3">
        {items.map( item => (
          <ItemEl key={item.id} id={item.id} name={item.name} desc={item.desc} />
        ))}
      </div>
      
    </div>
  );
}

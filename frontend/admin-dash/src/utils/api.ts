
import { Item } from "./types";


export async function fetchItems(): Promise<Item[]> {
    const response = await fetch(`${process.env.API_URL}/items`)
    if ( !response.ok) {
        throw new Error("failed to fetch items!")
    }

    return response.json()
}
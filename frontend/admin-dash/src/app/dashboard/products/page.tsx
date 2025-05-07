"use client";
import { columns } from "@/components/tables/products/columns"
import { DataTable } from "@/components/tables/products/data-table"
import { useTeam } from "@/components/team-provider";

import { Product } from "@/lib/definitions"
import { useEffect, useState } from "react"

export default function Page() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true) 
    const team = useTeam()

    useEffect(() => {
        const fetchProducts = async () => {
            if( !team.activeTeamName) return
            try {
                const response = await fetch("/api/products", {
                    headers: {
                        'team_id': team.activeTeamId.toString(),
                    }
                })
                
                const data = await response.json()
                
                if (response.ok) {
                    setProducts(data.data)
                }
            } catch (error) {
                console.error("Failed to fetch products:", error)
            } finally {
                setLoading(false)
            }
        };

        fetchProducts();
    }, [team.activeTeamName]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="container mx-auto py-10">
                <DataTable columns={columns} data={products} />
              </div>
            )}
        </div>
    );
}

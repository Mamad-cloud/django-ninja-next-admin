"use client";
import { columns } from "@/components/tables/products/columns"
import { DataTable } from "@/components/tables/products/data-table"

import { Product } from "@/lib/definitions"
import { useEffect, useState } from "react"

export default function Page() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true) 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products")
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
    }, []);

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

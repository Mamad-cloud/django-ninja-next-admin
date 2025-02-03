"use client";

import { useTeam } from "@/components/team-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { useState } from "react";

export default function Page() {
    const { activeTeamName } = useTeam()

    const [pending, setPending] = useState(false)
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState(0)
    const [productQuantity, setProductQuantity] = useState(0)

    const submitHandler = async (e: any) => {
        e.preventDefault()

        const reqBody = {
            product: {
                name: productName,
                price: productPrice,
                quantity: productQuantity,
                team: activeTeamName
            }
        }

        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reqBody)
        })

        let data: any = {}

        try {
            data = await response.json()
        } catch (error: any) { }

        if (response.ok) {
            
            toast.success(`product ${data.data.name} was created!`)
        } else {
            toast.error(`couldn't create product`)
        }
    }

    return (
        <div className="flex flex-col w-full h-full">
            <form onSubmit={submitHandler} className="flex flex-col items-center">
                <div className="flex flex-row gap-3 w-full flex-wrap justify-center md:justify-start">
                    <div className="grid gap-2 grow">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder=""
                            required
                            disabled={pending}
                            value={productName}
                            onChange={(e) => { setProductName(e.target.value) }}
                        />
                    </div>
                    <div className="grid gap-2 grow">
                        <Label htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            type="number"
                            min={0}
                            placeholder=""
                            required
                            disabled={pending}
                            value={productPrice}
                            onChange={(e) => { setProductPrice(Number(e.target.value)) }}
                        />
                    </div>

                    <div className="grid gap-2 grow">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                            id="quantity"
                            type="number"
                            min={1}
                            placeholder=""
                            required
                            disabled={pending}
                            value={productQuantity}
                            onChange={(e) => { setProductQuantity(Number(e.target.value)) }}
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-3 w-full mt-4 flex-wrap justify-center md:justify-start">
                    <Button variant='default' type="submit">
                        Add Product
                    </Button>
                </div>
            </form>
        </div>
    )
}
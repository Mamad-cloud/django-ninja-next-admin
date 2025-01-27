'use server'

import { Item, Module } from "@/lib/definitions"
import { DJANGO_API_ENDPOINT } from "@/config/defaults"
import { FormState, SignupFormSchema,  LoginFormSchema} from "@/lib/definitions"
import ApiProxy from "@/app/api/api_proxy"

const LOGIN_URL = "/api/login/"

// const bcrypt = require('bcrypt') 

// TODO: handle the login the same as the signup maybe
export async function signup(form_state: FormState, form_data: FormData) : Promise<any> {

    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        username: form_data.get('username'),
        email: form_data.get('email'),
        password: form_data.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Prepare data for insertion into database
    const { username, email, password } = validatedFields.data
    
    // e.g. Hash the user's password before storing it
    //TODO: Double hashing the password (once here and once on the backend)
    //const hashedPassword = await bcrypt.hash(password, 10)
    

    // Call the provider or db to create a user...
    const response = await fetch(`${DJANGO_API_ENDPOINT}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
    })
    // TODO: handle Erros better ( in sync with backend )
    const data = await response.json()
    if (data.error) {
        return {
            message: data.error
        }
    }

}


export async function fetchItems(): Promise<Item[]> {
    const response = await fetch(`${DJANGO_API_ENDPOINT}/items`)
    if ( !response.ok) {
        throw new Error("failed to fetch items!")
    }

    return response.json()
}

export async function fetchModules(): Promise<Module[]> {
    const response = await ApiProxy.get(`${DJANGO_API_ENDPOINT}/teams/modules`, false)
    if ( response.status === 200 ) {
        return response.data as Module[]
    } 
    return []
}
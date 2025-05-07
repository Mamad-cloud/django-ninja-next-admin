'use server'


import { redirect } from "next/navigation"

import { ModuleBase, UserDetails, Team, UserBase } from "@/lib/definitions"
import { DJANGO_API_ENDPOINT } from "@/config/defaults"
import { FormState, SignupFormSchema } from "@/lib/definitions"
import ApiProxy from "@/app/api/api_proxy"


// const bcrypt = require('bcrypt') 

// TODO: handle the login the same as the signup maybe
export async function signup(form_state: FormState, form_data: FormData) : Promise<any> {

    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        name: form_data.get('name'),
        lastname: form_data.get('lastname'),
        username: form_data.get('username'),
        email: form_data.get('email'),
        password: form_data.get('password'),
        modules: form_data.get('modules'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Prepare data for insertion into database
    const { name, lastname, username, email, password, modules } = validatedFields.data
    
    // e.g. Hash the user's password before storing it
    //TODO: Double hashing the password (once here and once on the backend)
    //const hashedPassword = await bcrypt.hash(password, 10)
    

    // Call the provider or db to create a user...
    const response = await fetch(`${DJANGO_API_ENDPOINT}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, lastname, username, password, email, modules }),
    })
    // TODO: handle Erros better ( in sync with backend )
    const data = await response.json()
    if (data.error) {
        return {
            message: data.error
        }
    }
    //console.log(data)
    redirect(`/login?username=${data.username}`)

}
// TODO: change the requiredAuth to false see if there is no problem because this endpoint is unprotected
export async function fetchModules(): Promise<ModuleBase[]> {
    const response = await ApiProxy.get(`${DJANGO_API_ENDPOINT}/teams/modules`, true)
    if ( response.status === 200 ) {
        return response.data as ModuleBase[]
    } 
    return []
}

export async function fetchUserDetails(): Promise<UserBase> {
    const response = await ApiProxy.get(`${DJANGO_API_ENDPOINT}/user`, true)
    if ( response.status === 200 ) {
        return response.data as UserBase
    } 
    return {}
}

export async function fetchUserTeams(): Promise<Team[]> {
    const response = await ApiProxy.get(`${DJANGO_API_ENDPOINT}/teams/user/teams`, true)
    if ( response.status === 200 ) {
        return response.data as Team[]
    } 
    return []
}

export async function fetchUserModules(): Promise<ModuleBase[]> {
    const response = await ApiProxy.get(`${DJANGO_API_ENDPOINT}/teams/user/modules`, true)
    if ( response.status === 200 ) {
        return response.data as ModuleBase[]
    } 
    return []
}


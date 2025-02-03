
import { LucideIcon } from 'lucide-react'
import { z } from 'zod'

export interface ModuleBase {
    id?: number
    name: string
}

export interface Module extends ModuleBase {
    icon: string
    onSelect?: () => void
    selected: boolean
}

export interface UserBase {
    username?: string
    email?: string
    first_name?: string
    last_name?: string
}

export interface UserDetails extends UserBase {
    avatar?: string
}

export interface Team {
    id: number
    name?: string
    leader?: string
    plan?: 'free' | 'enterprise' | 'startup'
}

export interface SidebarData {
    user: UserDetails
    teams: Team[]
    userModules: {
        title: string
        url: string
        icon?: string
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
    
}

// TODO: product should have the username and team name rather than their ids (change the product in backend: teams.schemas)
export interface Product {
    name: string
    price: number
    quantity: number
    user: number
    team: number
    
}

export type FormState =
    | {
        errors?: {
            username?: string[]
            email?: string[]
            password?: string[]
        }
        message?: string
    }
    | undefined

export const SignupFormSchema = z.object({
    name: z.string(),
    lastname: z.string(),
    username: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
    modules: z.string(),
    
})

export const LoginFormSchema = z.object({
    username: z
        .string()
        .trim(),
    password: z
        .string()
        .trim(),
})

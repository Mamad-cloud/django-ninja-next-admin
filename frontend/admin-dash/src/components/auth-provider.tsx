"use client"


import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { createContext, useContext, useState, useEffect } from "react"
//TODO: setActiveTeam from here
// Define the type for the authentication context values
type AuthContextVals = {
    isAuthenticated: boolean,
    username: string,
    login: (username: string) => void,
    logout: () => void,
    loginRequiredRedirect: () => void
}

// Default values for the authentication context
const defaults : AuthContextVals = {
    isAuthenticated: false,
    username: "",
    login: (_) => {},
    logout: () => {},
    loginRequiredRedirect: () => {}
} 

// Create the authentication context with default values
const AuthContext = createContext(defaults)

// Define constant URLs and local storage keys for authentication handling
const LOGIN_REDIRECT_URL = "/dashboard"
const LOGOUT_REDIRECT_URL = "/login"
const LOGIN_REQUIRED_URL = "/login"
const LOCAL_STORAGE_KEY = "is-logged-in"
const LOCAL_USERNAME_KEY = "username"

// The AuthProvider component wraps the application and provides authentication context
export function AuthProvider({ children }: {children: React.ReactNode}) {
    
    // State for authentication status and username
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState("")

     // Hooks from Next.js for navigation and URL handling
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Check authentication status and username from localStorage on initial load
    useEffect(() => {
        const storedAuthStatus = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (storedAuthStatus) {
            const storedAuthStatusInt = parseInt(storedAuthStatus)
            setIsAuthenticated(storedAuthStatusInt === 1) // Set auth status based on stored value
        }
        const storedUn = localStorage.getItem(LOCAL_USERNAME_KEY)
        if (storedUn) {
            setUsername(storedUn) // Set username from localStorage if available
        }
    }, [])


    // Function to log in the user
    const login = (username: string) => {
        setIsAuthenticated(true) // Update state to authenticated
        localStorage.setItem(LOCAL_STORAGE_KEY, "1") // Store authentication status
        
        if (username) {
            // Store username
            localStorage.setItem(LOCAL_USERNAME_KEY, `${username}`)
            setUsername(username)
        } else {
            // Remove username if not provided
            localStorage.removeItem(LOCAL_USERNAME_KEY)
        }
        
         // Redirect user after login, considering "next" parameter
        const nextUrl = searchParams.get("next")
        const invalidNextUrl = ['/login', '/logout']
        const nextUrlValid = nextUrl && nextUrl.startsWith("/") && !invalidNextUrl.includes(nextUrl)
        
        if (nextUrlValid) {
            // Redirect to the specified "next" URL
            router.replace(nextUrl)
            return
        } else {
            // Redirect to the default login redirect URL
            router.replace(LOGIN_REDIRECT_URL)
            return
        }
    }

    // Function to log out the user
    const logout = () => {
        setIsAuthenticated(false)
        localStorage.setItem(LOCAL_STORAGE_KEY, "0")
        router.replace(LOGOUT_REDIRECT_URL)
    }

    // Redirect the user to the login page if authentication is required
    const loginRequiredRedirect = () => {
        // user is not logged in via API
        setIsAuthenticated(false)
        localStorage.setItem(LOCAL_STORAGE_KEY, "0")

         // Generate a URL for the login page with the current pathname as "next"
        // let loginWithNextUrl = `${LOGIN_REQUIRED_URL}?next=${pathname}`
        // if (LOGIN_REQUIRED_URL === pathname) {
        //     loginWithNextUrl = `${LOGIN_REQUIRED_URL}`
        // }
        router.replace("/login")
    }

    // Provide the authentication context to child components
    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, loginRequiredRedirect, username}   }>
            {children}
        </AuthContext.Provider>
    )
}

// Hook to use the authentication context in components
export function useAuth() {
    return useContext(AuthContext)
}
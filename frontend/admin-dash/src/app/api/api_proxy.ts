import { getToken } from "@/lib/auth"

type ApiRequestHeaders = {
    "Content-Type"?: string,
    "Accept"?: string,
    "Authorization"? : string 
}

export default class ApiProxy {

    static async getHeaders(requireAuth: boolean) {
        let headers: ApiRequestHeaders = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
        const authToken = await getToken()
        if (authToken && requireAuth === true) {
            headers["Authorization"] = `Bearer ${authToken}`
        }
        return headers
    }

    static async handleFetch(endpoint: string, requestOptions: any) {
        let data = {}
        let status = 500
        try {
            const response = await fetch(endpoint, requestOptions)
            data = await response.json()
            status = response.status
        } catch (error) {
            data = {message: "Cannot reach API server", error: error}
            status = 500
        }
        return {data, status}
        
    }

    static async put(endpoint: string, object: any, requireAuth: boolean) {
        const jsonData = JSON.stringify(object)
        const headers = await ApiProxy.getHeaders(requireAuth)
        const requestOptions = {
            method: "PUT",
            headers: headers,
            body: jsonData
        }
        return await ApiProxy.handleFetch(endpoint, requestOptions)
    }

    static async delete(endpoint: string, requireAuth: boolean) {
        const headers = await ApiProxy.getHeaders(requireAuth)
        const requestOptions = {
            method: "DELETE",
            headers: headers,
        }
        return await ApiProxy.handleFetch(endpoint, requestOptions)
    }

    static async post(endpoint: string, object: any, requireAuth: boolean) {
        const jsonData = JSON.stringify(object)
        const headers = await ApiProxy.getHeaders(requireAuth)
        const requestOptions = {
            method: "POST",
            headers: headers,
            body: jsonData
        }
        return await ApiProxy.handleFetch(endpoint, requestOptions)
    }

    static async get(endpoint: string, requireAuth: boolean) {
        const headers = await ApiProxy.getHeaders(requireAuth)
        const requestOptions = {
            method: "GET",
            headers: headers
        }
        return await ApiProxy.handleFetch(endpoint, requestOptions)
    }
}
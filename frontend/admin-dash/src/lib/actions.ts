

export async function login(form_data: FormData) {
    const userName = form_data.get("username")
    const password = form_data.get("password")

    const response = await fetch(`${process.env.API_URL}/token/pair`, {
        method: "post",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ userName, password})
    })

    if ( !response.ok) {
        throw new Error( "Failed Authentication" )
    }

    const data = await response.json()
    sessionStorage.setItem("access", data.access)
    sessionStorage.setItem("refresh", data.refresh)

    return data
}
export async function fetchToken({ username, password }) {
    return await fetch(`${import.meta.env.VITE_API_URL}token/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        credentials: 'include',
    });
}

export async function fetchRefresh() {
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}token/refresh/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
    
}
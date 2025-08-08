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
    });
}

export async function fetchRefresh() {
    return await fetch(`${import.meta.env.VITE_API_URL}token/refresh/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
}
export async function fetchToken({ username, password }) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}token/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        credentials: "include",
    });

    if (!response.ok) {
        throw {
            message: `API fetch token pair error`,
            status: response.status,
            statusText: response.statusText,
            body: await response.json(),
        };
    }

    return response;
}

export async function fetchRefresh() {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}token/refresh/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        }
    );

    if (!response.ok) {
        throw {
            message: `API fetch refresh token error`,
            status: response.status,
            statusText: response.statusText,
            body: await response.json(),
        };
    }

    return response;
}

export async function fetchBlacklist() {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}token/blacklist/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        }
    );

    if (!response.ok) {
        throw {
            message: `API fetch blacklist token error`,
            status: response.status,
            statusText: response.statusText,
            body: await response.json(),
        };
    }

    return response;
}

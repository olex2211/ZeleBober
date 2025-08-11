export async function fetchCreateUser({ username, password, first_name, last_name, email }) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}users/registration/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
            first_name: first_name,
            last_name: last_name,
            email: email,
        }),
    });

    if (!response.ok) {
        throw {
            message: `API fetch create user error`,
            status: response.status,
            statusText: response.statusText,
            body: await response.json()
        };
    }

    return response;
}

export async function fetchUsers(accessToken) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}users/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw {
            message: `API fetch posts error`,
            status: response.status,
            statusText: response.statusText,
            body: await response.json()
        };
    }

    return response;
}
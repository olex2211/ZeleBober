export async function fetchCreateUser(formData) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}users/registration/`, {
        method: "POST",
        body: formData,
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

export async function fetchUsers({accessToken}) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}users/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw {
            message: `API fetch users error`,
            status: response.status,
            statusText: response.statusText,
            body: await response.json()
        };
    }

    return response;
}

export async function fetchUserById({accessToken, id}) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}users/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw {
            message: `API fetch user by id error`,
            status: response.status,
            statusText: response.statusText,
            body: await response.json()
        };
    }

    return response;
}
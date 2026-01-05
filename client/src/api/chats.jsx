export async function fetchChats({accessToken}) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}chats/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw {
            message: `API fetch chats error`,
            status: response.status,
            statusText: response.statusText,
            body: await response.json()
        };
    }

    return response;
}

export async function fetchChatMessages({accessToken, id}) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}chats/${id}/messages/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw {
            message: `API fetch chat messages error`,
            status: response.status,
            statusText: response.statusText,
            body: await response.json()
        };
    }

    return response;
}

export async function fetchCreateChat({ accessToken, formData }) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}chats/create/`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        body: formData
    });

    if (!response.ok) {
        throw {
            message: `API fetch create chat error`,
            status: response.status,
            statusText: response.statusText,
            body: await response.json()
        };
    }

    return response;
}

export async function fetchLeaveChat({ accessToken, id }) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}chats/${id}/leave/`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw {
            message: `API fetch leave chat error`,
            status: response.status,
            statusText: response.statusText,
            body: await response.json()
        };
    }

    return response;
}

export async function fetchPrivateChat({ accessToken, id }) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}chats/private/${id}/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw {
            message: `API fetch private chat error`,
            status: response.status,
            statusText: response.statusText,
            body: await response.json()
        };
    }

    return response;
}
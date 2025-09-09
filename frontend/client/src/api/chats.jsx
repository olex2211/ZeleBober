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
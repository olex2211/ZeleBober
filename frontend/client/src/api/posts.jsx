export async function fetchPosts({accessToken}) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}posts/`, {
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

export async function fetchPostById({accessToken, id}) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}posts/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw {
            message: `API fetch post by id error`,
            status: response.status,
            statusText: response.statusText,
            body: await response.json()
        };
    }

    return response;
}

export async function fetchComments({accessToken, id}) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}posts/${id}/comments/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw {
            message: `API fetch comments error`,
            status: response.status,
            statusText: response.statusText,
            body: await response.json()
        };
    }

    return response;
}

export async function fetchCreateComment({ accessToken, id, text }) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}posts/${id}/comments/create/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            text: text,
        }),
    });

    if (!response.ok) {
        throw {
            message: `API fetch create comment error`,
            status: response.status,
            statusText: response.statusText,
            body: await response.json()
        };
    }

    return response;
}

// export async function fetchCreatePost({ accessToken, description }) {
//     const response = await fetch(`${import.meta.env.VITE_API_URL}posts/create/`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             'Authorization': `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({
//             description: description,
//         }),
//     });

//     if (!response.ok) {
//         throw {
//             message: `API fetch create comment error`,
//             status: response.status,
//             statusText: response.statusText,
//             body: await response.json()
//         };
//     }

//     return response;
// }
export async function fetchCreateUser({ username, password, first_name, last_name, email }) {
    return await fetch(`${import.meta.env.VITE_API_URL}users/registration/`, {
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
}
import {useEffect, useState } from "react";
import useAuth from "../context/useAuth";

export default function HomePage() {
    const {accessToken} = useAuth();
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}users/`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchPosts();
    }, []);

    return (
        <>
            <ul>
            {posts.map((post, index) => (
                <li key={post.id || index} style={{ marginBottom: '10px' }}>
                <ul>
                    {Object.entries(post).map(([key, value]) => (
                    <li key={key}>
                        {key}: {JSON.stringify(value)}
                    </li>
                    ))}
                </ul>
                </li>
            ))}
            </ul>
        </>
    );
} 
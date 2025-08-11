import {useEffect, useState } from "react";
import { fetchUsers } from "../api/users";
import useAuth from "../context/useAuth";
import Header from "../components/header/header";

export default function HomePage() {
    const {authFetch} = useAuth();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        async function getData() {
            const response = await authFetch(fetchUsers);
            if (response) {
                setPosts(await response.json());
            }
            setIsLoading(false);
        }

        getData();
    }, [authFetch]);

    if (isLoading) {
        return (
            <>
                <div>LOADING</div>
            </>
        )
    }

    return (
        <>
            <Header />
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
import {useEffect, useState } from "react";
import { fetchPosts } from "../api/posts";
import useAuth from "../context/useAuth";
import SideBar from "../components/SideBar/SideBar"
import PostFeed from "../components/PostFeed/PostFeed"

export default function HomePage() {
    const {authFetch} = useAuth();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

 
    useEffect(() => {
        async function getData() {
            const response = await authFetch(fetchPosts);
            setPosts(await response.json());
            setIsLoading(false);
        }

        getData();
    }, []);

    return (
      <>
        <main className="main-container flex flex-row min-h-full overflow-hidden">
          <SideBar home/>
          <div className="home-container flex flex-col flex-1 h-full pr-[16%] overflow-auto">
            {isLoading ? <div>LOADING</div> : <PostFeed posts={posts} />}
          </div>
        </main>
      </>
    );
}
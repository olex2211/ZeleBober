import Post from "../Post/Post"
import { useState, useRef, useEffect } from "react";
import PostDetail from "../PostDetail/PostDetail";
import useAuth from "../../context/useAuth";
import { fetchComments } from "../../api/posts";
import { AnimatePresence } from "framer-motion";

export default function PostFeed({posts}) {
    const previousUrl = useRef(window.location.pathname);
    const [postDetail, setPostDetail] = useState(null);
    const [comments, setComments] = useState([]);
    const {authFetch} = useAuth();

    useEffect(() => {
        const handlePopState = () => setPostDetail(null);
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    const openPost = async (post) => {
        previousUrl.current = window.location.pathname;
        const id = post.id;
        
        const response = await authFetch(fetchComments, {id});
        if (response) {
            setComments(await response.json());
        }
        window.history.pushState({}, "", `/posts/${post.id}`);
        setPostDetail(post);
    }

    const closePost = () => {
        setPostDetail(null);
        setComments([]);
        window.history.pushState({}, "", previousUrl.current);
    } 
    
    return (
      <>
        <div className="post-feed flex flex-col w-full pt-[15px] px-[25%]">
        {posts.map((post, index) => (
            <Post key={index} post={post} openPost={openPost} />
        ))}
        <AnimatePresence>
            {postDetail && (
                <PostDetail
                    post={postDetail}
                    comments={comments}
                    setComments={setComments}
                    closePost={closePost}
                />
            )}
        </AnimatePresence>
        </div>
      </>
    );
}
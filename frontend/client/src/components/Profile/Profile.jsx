import "./Profile.css";
import { useState, useRef, useEffect } from "react";
import PostDetail from "../PostDetail/PostDetail";
import useAuth from "../../context/useAuth";
import { fetchComments } from "../../api/posts";
import { AnimatePresence } from "framer-motion";

export default function Profile({userData}) {
    const previousUrl = useRef(window.location.pathname);
    const [postDetail, setPostDetail] = useState(null);
    const postsCount = userData.posts?.length;
    const lastDigit = postsCount % 10;
    const postsLabel = lastDigit>=1 && lastDigit<=4 ? (lastDigit == 1 ? 'допис': 'дописи') : 'дописів';
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
            <div className="profile flex flex-col w-full pt-[56px] px-[15%] ">
                <div className="account flex w-full px-[10%]">
                    <img src={userData.photo} />
                    <div className="detail flex flex-col gap-y-[35px] wrap-break-word break-all">
                        <span className="username">{userData.username}</span>
                        <span className="flex">{postsCount}&nbsp;<p className="text-[#737373]">{postsLabel}</p></span>
                        <span className="name">{userData.first_name} {userData.last_name}</span>
                    </div>
                </div>
                <div className="posts-grid">
                {userData.posts?.map((post, index) => (
                    <img className="post" key={index} src={post.photo} onClick={() => openPost(post)} />
                ))}
                <AnimatePresence>
                    {postDetail && (
                        <PostDetail 
                            post={postDetail} 
                            comments={comments} 
                            closePost={closePost} 
                            setComments={setComments}
                        />
                    )}
                </AnimatePresence>
                </div>
            </div>
        </>
    )
}
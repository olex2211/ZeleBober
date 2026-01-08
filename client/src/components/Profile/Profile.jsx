import "./Profile.css";
import { useState, useRef, useEffect } from "react";
import PostDetail from "../PostDetail/PostDetail";
import useAuth from "../../context/useAuth";
import { fetchComments } from "../../api/posts";
import { fetchPrivateChat } from "../../api/chats";
import { fetchFollowUser } from "../../api/users";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Profile({userData}) {
    const {authFetch, user} = useAuth();
    const navigate = useNavigate();
    const previousUrl = useRef(window.location.pathname);

    const [postDetail, setPostDetail] = useState(null);
    const [activeButton, setActiveButton] = useState("posts");
    const [comments, setComments] = useState([]);
    const [isFollowing, setIsFollowing] = useState(userData.is_following);
    const [followersCount, setFollowersCount] = useState(userData.followers_count);
    
    const postsCount = userData.posts?.length;
    const postLastDigit = postsCount % 10;
    const postsLabel = postLastDigit>=1 && postLastDigit<=4 ? (postLastDigit == 1 ? 'допис': 'дописи') : 'дописів';

    const followersLastDigit = followersCount % 10;
    const followersLabel = followersLastDigit>=1 && followersLastDigit<=4 ? (followersLastDigit == 1 ? 'читач': 'читачі') : 'читачів';

    const followingLastDigit = userData.following_count % 10;
    const followingLabel = followingLastDigit>=1 && followingLastDigit<=4 ? (followingLastDigit == 1 ? 'стеження': 'стеження') : 'стежень';
    

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
        
        post.author = {...userData};
        post.author.posts = undefined;
        setPostDetail(post);
    }

    const closePost = () => {
        setPostDetail(null);
        setComments([]);
        window.history.pushState({}, "", previousUrl.current);
    } 

    const createPrivateChat = async () => {
        try{
            const response = await authFetch(fetchPrivateChat, {id: userData.id});
            const privateChat = await response.json();
            navigate(`/chats/${privateChat.id}`);

        } catch (error) {
            console.log(error);
        }
    }

    const toggleFollow = async () => {
        try {
            const response = await authFetch(fetchFollowUser, {id: userData.id});
            const data = await response.json();
            setIsFollowing(data.is_following);
            setFollowersCount(data.followers_count);
            userData.is_following = data.is_following;
            userData.followers_count = data.followers_count;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="profile flex flex-col w-full pt-[56px] px-[15%] ">
                <div className="account flex w-full px-[15%]">
                    <img src={userData.photo} />
                    <div className="detail flex flex-col gap-y-[35px] wrap-break-word break-all">
                        <div className="detail-header">
                            <span className="username">{userData.username}</span>
                            {(user.id != userData.id) ? <button onClick={createPrivateChat}>Повідомлення</button> : <></>}
                            {(user.id != userData.id) ? <button onClick={toggleFollow}>{isFollowing ? "Відстежується" : "Стежити"}</button> : <></>}
                        </div>
                        <div className="flex gap-x-[20px]">
                            <span className="flex">{postsCount}&nbsp;<p className="text-[#737373]">{postsLabel}</p></span>
                            <span className="flex">{followersCount}&nbsp;<p className="text-[#737373]">{followersLabel}</p></span>
                            <span className="flex">{userData.following_count}&nbsp;<p className="text-[#737373]">{followingLabel}</p></span>
                        </div>
                        <span className="name">{userData.first_name} {userData.last_name}</span>
                    </div>
                </div>
                <div className="posts-buttons">
                    <button onClick={() => setActiveButton("posts")} className={activeButton=="posts" && "active"}><svg viewBox="0 0 24 24" width="24" height="24" fill="currentcolor" class="x14rh7hd"><title>Дописи</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" d="M3 3H21V21H3z"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" d="M9.01486 3 9.01486 21"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" d="M14.98514 3 14.98514 21"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" d="M21 9.01486 3 9.01486"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" d="M21 14.98514 3 14.98514"></path></svg></button>
                    <button onClick={() => setActiveButton("liked_posts")} className={activeButton=="liked_posts" && "active"}><svg fill="currentcolor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Обрані</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg></button>
                </div>
                <div className="posts-grid">
                {activeButton=="posts" && userData.posts?.map((post, index) => (
                    <img className="post" key={index} src={post.photo} onClick={() => openPost(post)} />
                ))}
                {activeButton=="liked_posts" && userData.liked_posts?.map((post, index) => (
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
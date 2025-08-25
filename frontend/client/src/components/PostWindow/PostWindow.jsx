import useAuth from "../../context/useAuth";
import { useState } from "react";
import { Link } from "react-router-dom";
import Comment from "../Comment/Comment";
import { timeAgo } from "../../utils/utils";
import { fetchCreateComment, fetchComments, fetchLikePost } from "../../api/posts";


export default function PostWindow({post, comments, setComments, closePost}) {
    const {user, authFetch} = useAuth();
    const [copied, setCopied] = useState(false);
    const [isLiked, setIsLiked] = useState(post.is_liked);
    const [likesCount, setLikesCount] = useState(post.likes_count);

    post.text = post.description;

    async function likePost() {
        try {
            const response = await authFetch(fetchLikePost, {id: post.id});
            const data = await response.json()
            console.log(data);
            setIsLiked(data.is_liked);
            setLikesCount(data.likes_count);
            post.is_liked = !post.is_liked;
        } catch (error) {
            console.log(error);
        }
    }

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Не вдалося скопіювати: ", err);
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = {
            text: e.target.elements.text.value,
            id: post.id,
        }

        try {
            await authFetch(fetchCreateComment, formData);
            const response = await authFetch(fetchComments, {id: post.id});
            setComments(await response.json());
            e.target.reset();
        }
        catch (error) {
            console.error(error);
        }
    }

    return(
        <>
            <div className="post-img-container">
                <img src={post.photo} />
            </div>
            <div className="post-information">
                <Link to={`/users/${post.author.id}`} onClick={() => closePost()} className="user">
                    <img src={post.author.photo} />
                    {post.author.username}
                </Link>
                <div className="comments text-[14px] leading-[1.3] whitespace-pre-wrap">
                    <Comment comment={post} closePost={closePost}/>
                    {comments.map((comment, index) => (
                        <Comment comment={comment} key={index} closePost={closePost}/>
                    ))}
                </div>
                <div className="buttons">
                    {isLiked && <svg onClick={likePost} className="like" fill="#ff3040" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>}
                    {!isLiked && <svg onClick={likePost} fill="#000000" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>}
                    {!copied ? <svg onClick={handleCopy} aria-label="Поширити" fill="#000000" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Поширити</title><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg> :null}
                    {copied ? "✔ Скопійовано" : null}
                </div>
                <div className="px-[14px] mt-[8px] text-[14px] font-[500] leading-[1.3]">Позначки «Подобається»: {likesCount}</div>
                <p className="created-time px-[14px] pb-[14px]">{timeAgo(post.created_at)}</p>
                <form className="add-comment" onSubmit={handleSubmit}>
                    <img src={user.photo} />
                    <textarea name="text" placeholder="Додайте коментар..." required></textarea>
                    <button type="submit">Опублікувати</button>
                </form>
            </div>
        </>
    )
}
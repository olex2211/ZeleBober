import "./PostDetail.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Comment from "../Comment/Comment";
import { motion } from "framer-motion";
import PostWindow from "../PostWindow/PostWindow";

export default function PostDetail({post, closePost, comments}) {


    useEffect(() => {
        const handleEsc = (event) => {
        if (event.key === "Escape") {
            closePost();
        }
        };

        window.addEventListener("keydown", handleEsc);

        return () => window.removeEventListener("keydown", handleEsc);
    }, [closePost]);

    return (
        <>
            <motion.div
                className="post-detail-background"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            />
            <motion.div
                className="post-detail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <PostWindow
                    post={post}
                    comments={comments}
                    closePost={closePost}
                />
            </motion.div>
            <button className="close-button" onClick={() => closePost()}/>
        </>
    )
}

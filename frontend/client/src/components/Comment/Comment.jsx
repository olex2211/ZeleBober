import "./Comment.css";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/utils";


export default function Comment({comment, closePost}) {
    
  return (
    <>
      <div className="comment">
        <img src={comment.user_photo} />
        <div className="text">
          <Link to={`/users/${comment.author}`} onClick={() => closePost()}>
            <b>{comment.username}</b> <br /> 
          </Link>
          {comment.text}
          <p className="created-time">{timeAgo(comment.created_at)}</p>
        </div>
      </div>
    </>
  );
}

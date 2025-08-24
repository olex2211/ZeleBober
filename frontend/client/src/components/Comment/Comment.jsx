import "./Comment.css";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/utils";
import { useNavigate } from "react-router-dom";


export default function Comment({comment, closePost}) {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="comment">
        <img src={comment.author.photo} onClick={() => {
            closePost();
            navigate(`/users/${comment.author.id}`);
        }}/>
        <div className="text">
          <Link to={`/users/${comment.author.id}`} onClick={() => closePost()}>
            <b>{comment.author.username}</b> <br /> 
          </Link>
          {comment.text}
          <p className="created-time">{timeAgo(comment.created_at)}</p>
        </div>
      </div>
    </>
  );
}

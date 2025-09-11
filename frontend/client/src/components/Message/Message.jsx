import "./Message.css";
import useAuth from "../../context/useAuth";
import { useNavigate } from "react-router-dom";

export default function Message({message, isSameAuthor}) {
    const {user} = useAuth();
    const navigate = useNavigate();

    return (
        <div className={"message-container" + (message.author.id === user.id ? " right" : "") + (isSameAuthor ? " sameAuthor" : "")}>
            <img src={message.author.photo} onClick={() => navigate(`/users/${message.author.id}`, { replace: true })}/>
            <div className="message-text">{message.text}</div>
        </div>
    )
}
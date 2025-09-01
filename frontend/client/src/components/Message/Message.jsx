import "./Message.css";
import useAuth from "../../context/useAuth";

export default function Message({message, chat, isSameAuthor}) {
    const {user} = useAuth();
    const author = chat.members.find(member => member.id === message.author);

    return (
        <div className={"message-container" + (author.id === user.id ? " right": "") + (isSameAuthor ? " sameAuthor" : "")}>
            <img src={author.photo}/>
            <div className="message-text">{message.text}</div>
        </div>
    )

}
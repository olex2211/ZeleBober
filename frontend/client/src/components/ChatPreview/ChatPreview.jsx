import "./ChatPreview.css";
import { useState } from "react";
import useAuth from "../../context/useAuth";

export default function ChatPreview({chat, onClick, activeChat}) {
    const { user } = useAuth();
    const [otherUser, setOtherUser] = useState(chat.private ? chat.members.find((member) => member.id !== user.id) : null);

    return (
      <>
        <div className={`chat-preview ${activeChat && activeChat.id === chat.id && "active"}`} onClick={onClick}>
            <img src={chat.private ? otherUser.photo : chat.photo}/>
            <div className="chat-preview-body">
                <div className="preview-body-title">{chat.private ? `${otherUser.first_name} ${otherUser.last_name}` : chat.title}</div>
                <div className="preview-body-msg">
                    {chat.last_message?.text}
                </div>
            </div>
        </div>
      </>
    );
}
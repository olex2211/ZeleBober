import "./ChatFeed.css";
import ChatPreview from "../ChatPreview/ChatPreview";
import useAuth from "../../context/useAuth";
import addChat from "../../assets/add-chat.svg"
import { useState } from "react";
import AddChatWindow from "../AddChatWindow/AddChatWindow";

export default function ChatFeed({chats, setActiveChat}) {
    const { user } = useAuth();
    const [showAddChatWindow, setShowAddChatWindow] = useState(false);

    return (
      <>
        <div className="chat-feed flex flex-col w-[23%] min-w-[290px] max-w-[390px]">
            <div className="chat-feed-header">
                {user.username} <img onClick={() => setShowAddChatWindow(true)} src={addChat}/>
            </div>
            <div className="chat-feed-title">Повідомлення</div>
            <div className="chat-feed-scroll">
            {chats.map((chat, index) => (
                <ChatPreview onClick={() => setActiveChat(chat)} chat={chat} key={index}/>
            ))}
            </div>
        </div>
        {showAddChatWindow && <AddChatWindow closeFunction={() => setShowAddChatWindow(false)}/>}
      </>
    );
}
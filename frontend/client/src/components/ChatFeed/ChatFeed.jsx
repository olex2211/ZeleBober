import "./ChatFeed.css";
import ChatPreview from "../ChatPreview/ChatPreview";
import useAuth from "../../context/useAuth";

export default function ChatFeed({chats, setActiveChat}) {
  const { user } = useAuth();

    return (
      <>
        <div className="chat-feed flex flex-col w-[23%] min-w-[290px] max-w-[390px]">
            <div className="chat-feed-header">{user.username}</div>
            <div className="chat-feed-title">Повідомлення</div>
            <div className="chat-feed-scroll">
            {chats.map((chat, index) => (
                <ChatPreview onClick={() => setActiveChat(chat)} chat={chat} key={index}/>
            ))}
            </div>
        </div>
      </>
    );
}
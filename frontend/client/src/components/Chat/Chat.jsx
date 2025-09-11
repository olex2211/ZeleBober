import "./Chat.css";
import { useEffect, useState, useRef } from "react";
import { fetchChatMessages } from "../../api/chats";
import useAuth from "../../context/useAuth";
import Message from "../Message/Message";
import MemberPreview from "../MemberPreview/MemberPreview";
import InfoButton from "../../assets/info-button.svg"
import { fetchLeaveChat } from "../../api/chats";
import { useNavigate } from "react-router-dom";

export default function Chat({chat}) {    
    const {authFetch, user} = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const {accessToken} = useAuth();
    const messagesEndRef = useRef(null);
    const [openInfo, setOpenInfo] = useState(false);
    const navigate = useNavigate();
    const [otherUser, setOtherUser] = useState(chat.private ? chat.members.find((member) => member.id !== user.id) : null);

    useEffect(() => {
        async function getMessages() {
            const response = await authFetch(fetchChatMessages, {id: chat.id});
            setMessages(await response.json());
            setIsLoading(false);
        }
    
        getMessages();
    }, [chat]);

    useEffect(() => {
        if (isLoading) return;

        const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}chats/${chat.id}/`, ["Bearer", accessToken]);

        ws.onopen = () => {
            console.log("Connected to chat:", chat.id);
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const member = chat.members.find((member) => member.id === data.message.author.id);
            data.message.author.photo = member.photo;

            if (data.type === "message") {
                setMessages((prev) => [...prev, data.message]);
            } else if (data.type === "error") {
                console.error("Error: ", data.error);
            }
        };

        ws.onerror = (err) => {
            console.error("WebSocket error:", err);
        };

        ws.onclose = (close) => {
            console.log("WebSocket closed: ", close);
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, [chat, isLoading]);

    const sendMessage = () => {
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            console.warn("Socket not connected");
            return;
        }

        if (!inputValue.trim()) return;

        const payload = { message: inputValue.trim() };
        socket.send(JSON.stringify(payload));
        setInputValue("");
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }, [messages]);

    async function handleLeaveChat() {
        try {
            await authFetch(fetchLeaveChat, {id: chat.id});
            navigate("/chats", { replace: true });
        } catch (error) {
            console.error(error);
        }
    }

    return (
      <>
        <div className="chat-container">
            <div className="chat-header">
                <img src={chat.private ? otherUser.photo : chat.photo}/>
                <div className="chat-header-body">
                    <p>{chat.private ? `${otherUser.first_name} ${otherUser.last_name}` : chat.title}</p>
                    {chat.private && <p>{otherUser.username}</p>}
                    {/* <p>{chat.private ? otherUser.last_name : chat.title}</p> */}
                </div>
                <img onClick={() => setOpenInfo(prev => !prev)} className="info" src={InfoButton} />
            </div>
            <div className="chat-messages flex-1 overflow-y-auto pt-[20px]">
                {messages.map((message, index) => {
                    const prevMessage = messages[index - 1];
                    const isSameAuthor = prevMessage?.author.id === message.author.id;
                    
                    return (
                        <Message key={index} message={message} chat={chat} isSameAuthor={isSameAuthor}/>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-footer">
                <div className="chat-input">
                    <input
                        id="message-input"
                        placeholder="Повідомлення..."
                        value={inputValue}
                        maxLength={1000}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") sendMessage();
                        }}
                    />
                    <button onClick={sendMessage}>Надіслати</button>
                </div>
            </div>
        </div>
        {openInfo && <div className="chat-sidebar">
            <div className="chat-sidebar-header">
                Докладніше
            </div>
            <div className="chat-sidebar-body">
                <div className="members-title">Учасники</div>
                <div className="members-container">
                {chat.members.map((member, index) =>
                    <MemberPreview key={index} member={member}/>
                )}
                </div>
            </div>
            <div className="chat-sidebar-footer">
                <button onClick={handleLeaveChat}>Залишити чат</button>
            </div>
        </div>}
      </>
    );
}
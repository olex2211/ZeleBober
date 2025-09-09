import "./Chat.css";
import { useEffect, useState, useRef } from "react";
import { fetchChatMessages } from "../../api/chats";
import useAuth from "../../context/useAuth";
import Message from "../Message/Message";
import InfoButton from "../../assets/info-button.svg"

export default function Chat({chat}) {
    const {authFetch} = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const {accessToken} = useAuth();
    const messagesEndRef = useRef(null);

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

    return (
      <>
        <div className="chat-container">
            <div className="chat-header">
                <img src="https://scontent.flwo3-1.fna.fbcdn.net/v/t1.15752-9/410209722_742189117298465_9218067172096842077_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=111&ccb=1-7&_nc_sid=ec592c&_nc_ohc=7lHEqudraU4Q7kNvwF0N1h6&_nc_oc=Adnv7ZN_czAsdmtK-Sv84A0D_z4lbMroYTY2cDYdW9afQcd-21RBZ0SXMNroTf_SgRY&_nc_zt=23&_nc_ht=scontent.flwo3-1.fna&oh=03_Q7cD3AF1sKn_mDaDbIuYLrFxcBAqEDFiVtyvB4gW6_GN0RRS0g&oe=68DBDE71"/>
                <div className="chat-header-body">
                    <p>{chat.title}</p>
                    <p>_username_</p>
                </div>
                <img className="info" src={InfoButton} />
            </div>
            <div className="chat-messages flex-1 overflow-y-auto pt-[20px]">
                {messages.map((message, index) => {
                    const prevMessage = messages[index - 1];
                    const isSameAuthor = prevMessage?.author === message.author;
                    
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
      </>
    );
}
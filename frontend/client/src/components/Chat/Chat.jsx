import "./Chat.css";
import { useEffect, useState } from "react";
import { fetchChatMessages } from "../../api/chats";
import useAuth from "../../context/useAuth";

export default function Chat({chat}) {
    const {authFetch} = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const {accessToken} = useAuth();

    useEffect(() => {
        async function getMessages() {
            const response = await authFetch(fetchChatMessages, {id: chat.id});
            setMessages(await response.json());
            setIsLoading(false);
        }
    
        getMessages();
    }, [chat]);

    useEffect(() => {
        if (!messages.length) return;

        const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}chats/1/`, ["Bearer", accessToken]);

        ws.onopen = () => {
            console.log("Connected to chat:", chat.id);
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("Received:", data);
            setMessages((prev) => [...prev, data]);
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

    return (
      <>
        <div className="chat-container">
            <div>{chat.title}</div>
            <div className="chat-messages flex-1 overflow-y-auto">
            {messages.map((message, index) => (
                <div key={index}>{message.text}</div>
            ))}
            </div>
        </div>
      </>
    );
}
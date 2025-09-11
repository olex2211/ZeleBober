import SideBar from "../components/SideBar/SideBar";
import ChatFeed from "../components/ChatFeed/ChatFeed";
import Chat from "../components/Chat/Chat";
import {useEffect, useState } from "react";
import { fetchChats } from "../api/chats";
import useAuth from "../context/useAuth";
import { useParams } from "react-router-dom";

export default function ChatsPage() {
    const {authFetch} = useAuth();
    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        async function getData() {
            const response = await authFetch(fetchChats);
            const data = await response.json();
            setChats(data);

            if (id) {
                const found = data.find((chat) => chat.id == id);
                if (found) {
                    setActiveChat(found);
                }
            }

            setIsLoading(false);
        }

        getData();
    }, []);

    return (
      <>
        <main className="main-container flex flex-row min-h-full overflow-hidden">
          <SideBar chats/>
          <div className="chats-container flex flex-1 h-full overflow-hidden">
            {isLoading ? <div>LOADING</div> : <>
                <ChatFeed chats={chats} setActiveChat={setActiveChat} activeChat={activeChat} />
                {activeChat && <Chat key={activeChat.id} chat={activeChat} />}
            </>}
          </div>
        </main>
      </>
    );
}
import {useRef } from "react";
import SideBar from "../components/SideBar/SideBar";
import PostFeed from "../components/PostFeed/PostFeed";

export default function HomePage() {
    const scrollRef = useRef(null);

    return (
      <>
        <main className="main-container flex flex-row min-h-full overflow-hidden">
          <SideBar home/>
          <div ref={scrollRef} className="home-container flex flex-col flex-1 h-full pr-[16%] overflow-auto">
            <PostFeed scrollRef={scrollRef} />
          </div>
        </main>
      </>
    );
}
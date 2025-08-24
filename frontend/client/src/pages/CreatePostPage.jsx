import {useEffect, useState } from "react";
import { fetchPosts } from "../api/posts";
import useAuth from "../context/useAuth";
import SideBar from "../components/SideBar/SideBar"
import CreatePostForm from "../components/CreatePostForm/CreatePostForm"

export default function CreatePostPage() {
    const {authFetch} = useAuth();

    return (
      <>
        <main className="main-container flex flex-row min-h-full overflow-hidden">
          <SideBar add/>
          <div className="create-post-container flex flex-col flex-1 h-full pr-[16%] overflow-auto">
            <CreatePostForm />
          </div>
        </main>
      </>
    );
}
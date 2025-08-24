import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { fetchPostById, fetchComments } from "../api/posts"
import useAuth from "../context/useAuth";
import SideBar from "../components/SideBar/SideBar";
import PostWindow from "../components/PostWindow/PostWindow";


export default function PostDetailPage() {
    const previousUrl = useRef(window.location.pathname);
    const { id } = useParams();
    const { authFetch } = useAuth();
    const [postDetail, setPostDetail] = useState([])
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
            async function getData() {
                const response = await authFetch(fetchPostById, {id});
                console.log(response);
                setPostDetail(await response.json());

                const CommentsResponse = await authFetch(fetchComments, {id});
                setComments(await CommentsResponse.json());
                setIsLoading(false);
            }
    
            getData();
        }, [authFetch]);

    const closePost = () => {
        setPostDetail(null);
        setComments([]);
        window.history.pushState({}, "", previousUrl.current);
    } 

    return (
      <>
        <main className="main-container flex flex-row min-h-full overflow-hidden">
          <SideBar />
          {isLoading ? (
              <div>LOADING</div>
            ) : (
          <div className="post-container flex flex-1 px-[8%] py-[2%] h-full overflow-auto">
              <div className="post-window-container flex  h-[100%] w-[100%] border-1 border-[#dadada] ">
                <PostWindow
                    post={postDetail}
                    comments={comments}
                    setComments={setComments}
                    closePost={closePost}
                />
              </div>
          </div>
          )}
        </main>
      </>
    );
}
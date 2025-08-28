import { useState, useEffect} from 'react';
import {fetchPosts} from "../../api/posts";
import useAuth from "../../context/useAuth";
import {throttle} from "lodash";

export default function ScrollPagination({scrollRef, children}) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const {authFetch} = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            if (page && data.next) {
                const response = await authFetch(fetchPosts, {url: data.next});
                const newData = await response.json();
                setData(prev => ({
                    results: [...prev.results, ...newData.results],
                    next: newData.next,
                    previous: newData.previous
                }));

            } else if (!page) {
                setData(await (await authFetch(fetchPosts)).json());
            }
            setIsLoading(false);
        }

        console.log(data);
        console.log("Fetch");
        getData()
    }, [page]);


    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        
        const handleScroll = throttle(() => {
            if (!isLoading && el && el.scrollTop + el.clientHeight > el.scrollHeight - 5) {
                console.log("scroll");
                setPage(prevPage => prevPage + 1);
            }
        }, 200);

        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    }, [scrollRef, isLoading]);


    return (
        <>
            {data.results?.map((element, index) =>
                children({element, index})
            )}
        </>
    );
}

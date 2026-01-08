import { throttle } from "lodash";
import { useState, useEffect} from 'react';
import useAuth from "../../context/useAuth";

export default function ScrollPagination({scrollRef, children, fetchFunction, search=undefined}) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const {authFetch} = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            if (page && data.next) {
                const response = await authFetch(fetchFunction, {url: data.next});
                const newData = await response.json();
                setData(prev => ({
                    results: [...prev.results, ...newData.results],
                    next: newData.next,
                    previous: newData.previous
                }));

            } else if (!page) {
                setData(await (await authFetch(fetchFunction, { search: search })).json());
            }
            setIsLoading(false);
        }

        getData()
    }, [page, search]);


    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        
        const handleScroll = throttle(() => {
            if (!isLoading && el && el.scrollTop + el.clientHeight > el.scrollHeight - 5) {
                // console.log("scroll");
                setPage(prevPage => prevPage + 1);
            }
        }, 300);

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

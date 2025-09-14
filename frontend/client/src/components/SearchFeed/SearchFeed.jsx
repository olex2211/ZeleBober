import "./SearchFeed.css";
import MemberPreview from "../MemberPreview/MemberPreview";
import ScrollPagination from "../ScrollPagination/ScrollPagination";
import { fetchUsers } from "../../api/users";
import { useState, useMemo, useRef } from "react";
import { debounce } from "lodash";

export default function SearchFeed() {
    const [search, setSearch] = useState("");
    const scrollRef = useRef(null);


    const debouncedSetSearch = useMemo(
        () => debounce((value) => setSearch(value), 400), 
        []
    );

    const handleSearch = async (e) => {
        debouncedSetSearch(e.target.value);
    }

    return (
      <>
        <div className="search-feed overflow-hidden flex flex-col w-full py-[35px] px-[15%]">
            <div className="search-feed-container overflow-hidden flex flex-col px-[50px] py-[30px] w-full border-[1px] border-solid rounded-[12px] border-[#e4e4e4]">
                <span className="search-title">Пошук</span>
                <input type="text" name="search" placeholder="Пошук користувача..." onChange={handleSearch} />
                <div className="flex flex-col overflow-y-auto" ref={scrollRef}>
                    <ScrollPagination scrollRef={scrollRef} fetchFunction={fetchUsers} search={search} key={search}>
                        {({ element, index }) => (
                            <MemberPreview key={index} member={element} />
                        )}
                    </ScrollPagination>
                </div>
            </div>
        </div>
      </>
    );
}
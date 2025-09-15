import "./AddChatWindow.css"
import { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { fetchUsers } from "../../api/users";
import { fetchCreateChat } from "../../api/chats";
import useAuth from "../../context/useAuth";
import ScrollPagination from "../ScrollPagination/ScrollPagination";
import MemberPreviewSmall from "../MemberPreviewSmall/MemberPreviewSmall";
import blackX from "../../assets/black-x.svg"

export default function AddChatWindow({closeFunction}) {
    const navigate = useNavigate();
    const scrollRef = useRef(null);
    const { authFetch } = useAuth();
    const [ members, setMembers ] = useState([]);
    const [title, setTitle] = useState("");
    const [search, setSearch] = useState("");
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    function toggleMember(memberId) {
        setMembers(prev =>
            prev.includes(memberId) 
                ? prev.filter(id => id !== memberId) 
                : [...prev, memberId]
        );
    }

    async function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        if (file) { formData.set("photo", file); }
        members.forEach((id) => {
            formData.append("member_ids", id); 
        });

        console.log(formData);
        try {
            await authFetch(fetchCreateChat, {formData});
            closeFunction();
            navigate("/chats", { replace: true }); 
        }
        catch (error) {
            console.log(error);
        }
    }

    function handleFileChange(e) {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const debouncedSetSearch = useMemo(
        () => debounce((value) => setSearch(value), 400), 
        []
    );

    const handleSearch = async (e) => {
        debouncedSetSearch(e.target.value);
    }

    return(
        <>
            <div className="add-chat-container">
                <form onSubmit={handleSubmit}>
                    <div className="add-chat-header">
                        Новий чат
                        <img onClick={closeFunction} src={blackX} />
                    </div>
                    <div className="add-chat-body">
                        <div className="title-container">
                            <label>
                                <img src={imagePreview ? imagePreview : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png" }/>
                                <span>{`${!imagePreview?"Вибрати":""}`}</span>
                                <input type="file" name="photo" accept="image/*" hidden onChange={handleFileChange} required/>
                            </label>
                            <input className="title" name="title" type="text" placeholder="Введіть назву чату" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                        </div>
                        <div className="user-search">
                            <p>Виберіть учасників:</p>
                            <input type="text" name="search" placeholder="Пошук користувача..." onChange={handleSearch} />
                        </div>
                        
                        <div className="members-container" ref={scrollRef}>
                            <ScrollPagination scrollRef={scrollRef} fetchFunction={fetchUsers} search={search} key={search}>
                                {({ element, index }) => (
                                    <MemberPreviewSmall key={index} member={element} isSelected={members.includes(element.id)} onToggle={() => toggleMember(element.id)}/>
                                )}
                            </ScrollPagination>
                        </div>
                    </div>
                    <div className="add-chat-footer">
                        <button type="submit" disabled={!members.length || !file || !title}>Створити</button>
                    </div>
                </form>
            </div>
        </>
    )
}
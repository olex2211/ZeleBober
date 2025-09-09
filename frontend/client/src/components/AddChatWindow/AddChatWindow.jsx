import "./AddChatWindow.css"
import { useState, useEffect } from "react";
import { fetchUsers } from "../../api/users";
import { fetchCreateChat } from "../../api/chats";
import useAuth from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
import MemberPreviewSmall from "../MemberPreviewSmall/MemberPreviewSmall";
import blackX from "../../assets/black-x.svg"

export default function AddChatWindow({closeFunction}) {
    const { user, authFetch } = useAuth();
    const [ users, setUsers ] = useState([]);
    const [ members, setMembers ] = useState([]);
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            const response = await authFetch(fetchUsers);
            setUsers(await response.json());
        }

        getData();
    }, []);


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
            await authFetch(fetchCreateChat, {formData})
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
                            <input className="title" name="title" type="text" placeholder="Введіть назву чату"/>
                        </div>
                        <p>Виберіть учасників</p>
                        <div className="members-container">
                        {users.map((member, index) =>
                            <MemberPreviewSmall key={index} member={member} isSelected={members.includes(member.id)} onToggle={() => toggleMember(member.id)}/>
                        )}
                        </div>
                    </div>
                    <div className="add-chat-footer">
                        <button type="submit" disabled={!members.length || !file}>Створити</button>
                    </div>
                </form>
            </div>
        </>
    )
}
import "./CreatePostForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCreatePost } from "../../api/posts"
import useAuth from "../../context/useAuth";
import addImage from "../../assets/add-image.svg";

export default function CreatePostForm() {
    const navigate = useNavigate();
    const { authFetch, user } = useAuth();
    const [imagePreview, setImagePreview] = useState(null);
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const maxLength = 2000;
    
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

    function handleCancel(e) {
        e.preventDefault();
        navigate("/", { replace: true });
    }
    
    async function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        if (file) {
            formData.set("photo", file);
        }

        try {
            await authFetch(fetchCreatePost, {formData})
            navigate("/", { replace: true });
        }
        catch (error) {
            console.log(error);
        }
    }
    
    return (
      <>
        <div className="form-container flex flex-col w-full py-[50px] px-[10%] ">
            <form onSubmit={handleSubmit}>
                <div className="form-header">
                    <button onClick={handleCancel}>Відмінити</button>
                    <p>Допис</p>
                    {imagePreview && <button type="submit">Створити</button>}
                </div>
                <div className="form-body">
                    <div className="photo"style={{backgroundImage: imagePreview ? `url(${imagePreview})` : "none", backgroundSize: "cover", backgroundPosition: "center",}}>
                        <img hidden/>
                        {!imagePreview && (
                            <>
                                <img className="add-image" src={addImage} />
                                <label>
                                    <span>Завантажити файл</span>
                                    <input type="file" name="photo" hidden onChange={handleFileChange} required/>
                                </label>
                            </>
                        )}
                    </div>
                    <div className="description">
                        <div className="user">
                            <img src={user.photo}/>
                            {user.username}
                        </div>
                        <textarea onInput={(e) => setText(e.target.value)} maxLength={maxLength} name="description" id="description" placeholder="Введіть опис" required></textarea>
                        <div className="length">
                            {text.length} / {maxLength}
                        </div>
                    </div>
                </div>
            </form>
        </div>
      </>
    );
}
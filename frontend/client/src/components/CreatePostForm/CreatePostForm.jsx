import "./CreatePostForm.css"

export default function CreatePostForm() {

    return (
      <>
        <div className="form-container flex flex-col w-full pt-[15px] px-[25%] bg-amber-100">
            <div className="form-header">
                <p>Створити допис</p>
            </div>
            <div className="form-body">
                <div className="photo">
                    Виберіть фото
                    <input type="file" content="Введіть опис" />
                </div>
                <div className="description">
                    <input type="text" content="Введіть опис" />
                </div>
            </div>
        </div>
      </>
    );
}
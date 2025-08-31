import "./ChatPreview.css";

export default function ChatPreview({chat, onClick}) {

    return (
      <>
        <div className="chat-preview" onClick={onClick}>
            <img src="https://scontent.flwo3-1.fna.fbcdn.net/v/t1.15752-9/410209722_742189117298465_9218067172096842077_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=111&ccb=1-7&_nc_sid=ec592c&_nc_ohc=7lHEqudraU4Q7kNvwF0N1h6&_nc_oc=Adnv7ZN_czAsdmtK-Sv84A0D_z4lbMroYTY2cDYdW9afQcd-21RBZ0SXMNroTf_SgRY&_nc_zt=23&_nc_ht=scontent.flwo3-1.fna&oh=03_Q7cD3AF1sKn_mDaDbIuYLrFxcBAqEDFiVtyvB4gW6_GN0RRS0g&oe=68DBDE71"/>
            <div className="chat-preview-body">
                <div className="preview-body-title">{chat.title}</div>
                <div className="preview-body-msg">
                    {chat.last_message?.text}
                </div>
            </div>
        </div>
      </>
    );
}
import "./MemberPreview.css";

export default function MemberPreview({member}) {

    return (
      <>
        <div className="member-preview">
            <img src={member.photo}/>
            <div className="member-preview-body">
                <div className="member-preview-body-title">{member.first_name + " " + member.last_name}</div>
                <div className="member-preview-body-msg">
                    {member.username}
                </div>
            </div>
        </div>
      </>
    );
}
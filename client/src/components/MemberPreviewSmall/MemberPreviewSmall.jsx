import "./MemberPreviewSmall.css";

export default function MemberPreviewSmall({member, isSelected, onToggle}) {
    return (
      <>
        <div className={`member-preview-small ${isSelected ? "selected" : ""}`}  onClick={onToggle}>
            <img src={member.photo}/>
            <div className="member-preview-small-body">
                <div className="member-preview-small-body-title">{member.first_name + " " + member.last_name}</div>
                <div className="member-preview-small-body-msg">
                    {member.username}
                </div>
            </div>
            <span className="circle-checkbox"></span>
        </div>
      </>
    );
}
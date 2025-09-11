import "./MemberPreview.css";
import { Link } from "react";
import { useNavigate } from "react-router-dom";

export default function MemberPreview({member}) {
  const navigate = useNavigate();

    return (
      <>
        <div className="member-preview" onClick={() => navigate(`/users/${member.id}`, { replace: true })}>
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
import "./SideBarButton.css";
import useAuth from "../../context/useAuth";
import { Link } from "react-router";

export default function SideBarButton({src, srcBold, text, clicked=false, profile, to, logoutButton, small=false}) {
    const { logout } = useAuth();
    
    return (
      <>
        <Link className="sidebar-button-link" to={to} onClick={logoutButton?logout:null}>
            <img src={clicked ? srcBold : src} className={profile ? (clicked ? "rounded-[50%] object-cover outline-[2px]" : "rounded-[50%] object-cover") : ""}/>
            {!small && <p className={clicked ? "font-[700]" : "font-[400]"}>{text}</p>}
        </Link>
      </>
    )
}
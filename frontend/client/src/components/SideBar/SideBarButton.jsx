import "./SideBarButton.css";
import { Link } from "react-router";

export default function SideBarButton({iconPath, text}) {
    

    return (
      <>
        <Link className="sidebar-button-link" to="/"> 
            <img src={iconPath}/>
            <p>{text}</p>
        </Link>
      </>
    )
}
import "./SideBar.css";
import SideBarButton from "../SideBarButton/SideBarButton"
import home from "../../assets/home.svg"
import homeBold from "../../assets/homeBold.svg"
import chats from "../../assets/chats.svg"
import chatsBold from "../../assets/chatsBold.svg"
import likes from "../../assets/likes.png"
import likesBold from "../../assets/likesBold.png"
import add from "../../assets/add.png"
import addBold from "../../assets/addBold.png"
import zelebober1 from "../../assets/ZeleBober.png"
import zelebober2 from "../../assets/ZeleBober2.png"
import zelebober3 from "../../assets/ZeleBober3.png"
import logout from "../../assets/logout.png"
import useAuth from "../../context/useAuth";
import { Link } from "react-router-dom";

export default function SideBar(props) {
    const { user } = useAuth();

    return (
      <>
        <div className="sidebar-container">
          <Link to="/" className="logo-container">
            <img src={zelebober1}/>
          </Link>
          <div className="nav-container">
            <SideBarButton to="/" text="Головна" src={home} srcBold={homeBold} clicked={"home" in props}/>
            <SideBarButton to="/chats" text="Чати" src={chats} srcBold={chatsBold} clicked={"chats" in props}/>
            <SideBarButton to="/likes" text="Вподобане" src={likes} srcBold={likesBold} clicked={"likes" in props}/>
            <SideBarButton to="/posts/create" text="Створити" src={add} srcBold={addBold} clicked={"add" in props}/>
            <SideBarButton to={`/users/${user.id}`} text="Профіль" src={user.photo} srcBold={user.photo} clicked={"profile" in props && props.profile} profile/>
            <SideBarButton to="/login" text="Вийти" src={logout} srcBold={logout} clicked={false} logoutButton/>
          </div>
        </div>
      </>
    );
}
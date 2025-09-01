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
import zelebober from "../../assets/ZeleBober3.png"
import zeleboberSmall from "../../assets/ZeleBober.svg"
import logout from "../../assets/logout.png"
import useAuth from "../../context/useAuth";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SideBar(props) {
    const { user } = useAuth();
    const [isChats, setIsChats] = useState("chats" in props);

    return (
      <>
        <div className={isChats ? "sidebar-container small" : "sidebar-container"}>
          <Link to="/" className="logo-container">
            <img src={isChats ? zeleboberSmall : zelebober}/>
          </Link>
          <div className="nav-container">
            <SideBarButton small={isChats} to="/" text="Головна" src={home} srcBold={homeBold} clicked={"home" in props}/>
            <SideBarButton small={isChats} to="/chats" text="Чати" src={chats} srcBold={chatsBold} clicked={"chats" in props}/>
            <SideBarButton small={isChats} to="/search" text="Пошук" src={likes} srcBold={likesBold} clicked={"likes" in props}/>
            <SideBarButton small={isChats} to="/posts/create" text="Створити" src={add} srcBold={addBold} clicked={"add" in props}/>
            <SideBarButton small={isChats} to={`/users/${user.id}`} text="Профіль" src={user.photo} srcBold={user.photo} clicked={"profile" in props && props.profile} profile/>
            <SideBarButton small={isChats} to="/login" text="Вийти" src={logout} srcBold={logout} clicked={false} logoutButton/>
          </div>
        </div>
      </>
    );
}
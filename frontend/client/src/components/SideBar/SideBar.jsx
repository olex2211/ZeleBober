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
import logout from "../../assets/logout.png"
import useAuth from "../../context/useAuth";

export default function SideBar(props) {
    const { user } = useAuth();

    return (
      <>
        <div className="sidebar-container">
          <div className="logo-container">
            <img src={zelebober1}/>
          </div>
          <div className="nav-container">
            <SideBarButton to="/" text="Головна" src={home} srcBold={homeBold} clicked={"home" in props}/>
            <SideBarButton to="/chats" text="Чати" src={chats} srcBold={chatsBold} clicked={"chats" in props}/>
            <SideBarButton to="/likes" text="Вподобане" src={likes} srcBold={likesBold} clicked={"likes" in props}/>
            <SideBarButton to="/add" text="Створити" src={add} srcBold={addBold} clicked={"add" in props}/>
            <SideBarButton to={`/users/${user.id}`} text="Профіль" src={user.photo} srcBold={user.photo} clicked={"profile" in props} profile/>
            <SideBarButton to="/login" text="Вийти" src={logout} srcBold={logout} clicked={false} logoutButton/>
          </div>
        </div>
      </>
    );
}
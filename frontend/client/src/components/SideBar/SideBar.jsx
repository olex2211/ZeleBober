import "./SideBar.css";
import SideBarButton from "./SideBarButton"
import instagram from "../../assets/instagram.svg"

export default function SideBar() {
    

    return (
      <>
        <div className="sidebar-container">
          <div className="logo-container">Logooo</div>
          <div className="nav-container">
            <SideBarButton text="Головна" iconPath={instagram}/>
            <SideBarButton text="Чати" iconPath={instagram}/>
            <SideBarButton text="Вподобане" iconPath={instagram}/>
            <SideBarButton text="Створити" iconPath={instagram}/>
            <SideBarButton text="Профіль" iconPath={instagram}/>
          </div>
        </div>
      </>
    );
}
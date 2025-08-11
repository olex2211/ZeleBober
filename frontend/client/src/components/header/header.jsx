import "./header.css"
import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth";
export default function Header() {
  const { logout } = useAuth()
  
  return (
    <>
      <header>
        <nav className="flex justify-between">
          <Link to="/">Zaglyshka na logo</Link>
          <Link to="/login">Login</Link>
          <Link to="/registration">Registration</Link>
          <button onClick={logout}>Logout</button>
        </nav>
      </header>
    </>
  );
}
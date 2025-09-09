import "./RegistrationForm.css"
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../context/useAuth";
import { useState } from "react";
import zelebober from "../../assets/ZeleBober3.png"


export default function RegistrationForm() {
const { login, register } = useAuth();
const [errorMessages, setErrorMessages] = useState([]);
const navigate = useNavigate();

async function handleRegistration(e) {
    e.preventDefault();
    const registrationFormData = new FormData(e.target);
    const loginFormData = new FormData();
    loginFormData.append("username", registrationFormData.get("username"));
    loginFormData.append("password", registrationFormData.get("password"));

    try {
        const registrationResponse = await register(registrationFormData);
        const loginResponse = await login(loginFormData);
        navigate("/", { replace: true });
    } catch (error) {
        setErrorMessages(error.body);
        console.log(error);
    }
}

return (
  <>
    <div className="registration-container">
        <div className="registration-body">
            <div className="logo-image">
                <img src={zelebober} alt="" className="logo" />
            </div>
            <div className="welcome-text">
                <p className="text">Зареєструйтеся, щоб переглядати світлини та відео від друзів.</p>
            </div>
            <div className="registration-form">
                <form onSubmit={handleRegistration}>
                <p className="text-red-800">{errorMessages?.username}</p>
                <input type="text" name="username" placeholder="username" />
                <p className="text-red-800">{errorMessages?.password}</p>
                <input type="text" name="password" placeholder="password" />
                <p className="text-red-800">{errorMessages?.first_name}</p>
                <input type="text" name="first_name" placeholder="first name" />
                <p className="text-red-800">{errorMessages?.last_name}</p>
                <input type="text" name="last_name" placeholder="last name" />
                <p className="text-red-800">{errorMessages?.email}</p>
                <input type="text" name="email" placeholder="email" />
                <p className="text-red-800">{errorMessages?.image}</p>
                <input type="file" name="photo" accept="image/*" required/>

                <button type="submit">Register</button>
                </form>
            </div>
        </div>
        <div className="login-section">
            <div className="login-text">
                <p>У вас є обліковий запис?</p>
                <Link to="/login">Увійдіть</Link>
            </div>
        </div>
    </div>
  </>
);
}
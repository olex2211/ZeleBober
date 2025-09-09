import "./LoginForm.css";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../context/useAuth";
import zelebober from "../../assets/ZeleBober3.png"
import logo from "../../assets/loginLogo.png"

export default function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState();

    async function handleLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const response = await login(formData);
            navigate("/", { replace: true });
        } catch (error) {
            setErrorMessage(error.body);
        }
    } 

    return(
        <>
            <div className="login-container">
                <div className="login-body">

                    
                    <div className="login-img">
                        <img src={logo} alt="" className="login-image" />
                    </div>
                    <div className="login-form">
                        <img src={zelebober} alt="" className="zelebober-logo" />
                        <form onSubmit={handleLogin}>
                            <p className="text-red-800">{errorMessage?.detail}</p>
                            <input type="text" name="username" placeholder="Username" />
                            <input type="text" name="password" placeholder="Password" />
                            <button type="submit">Увійти</button>
                        </form>
                        <div className="login-text">
                            <Link to="#!">Забули пароль?</Link>
                            <p>Не маєте облікового запису? <Link href="/registration">Зареєструйтеся</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function LoginPage() {
    const {login, user} = useContext(AuthContext);

    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (user) {
    //         navigate("/", { replace: true });
    //     }
    // }, [user, navigate]);

    return(
        <>
            <form onSubmit={login}>
                <input type="text" name="username" placeholder="username"/>
                <input type="text" name="password" placeholder="password"/>
                <button type="submit">Knopka</button>
            </form>
        </>
    )
} 
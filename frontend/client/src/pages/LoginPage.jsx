import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../context/useAuth";

export default function LoginPage() {
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
    

    return (
      <>
        <form onSubmit={handleLogin}>
          <p className="text-red-800">{errorMessage?.detail}</p>
          <input type="text" name="username" placeholder="username" />
          <input type="text" name="password" placeholder="password" />
          <button type="submit">Knopka</button>
        </form>
      </>
    );
}

import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogin (e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));

    const result = await login(formData);
    if (result.success) {
      navigate("/", { replace: true });
    }
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <input type="text" name="username" placeholder="username" />
        <input type="text" name="password" placeholder="password" />
        <button type="submit">Knopka</button>
      </form>
    </>
  );
}

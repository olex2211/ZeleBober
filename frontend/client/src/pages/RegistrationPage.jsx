import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import { useState } from "react";

export default function RegistrationPage() {
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
  </>
);
}
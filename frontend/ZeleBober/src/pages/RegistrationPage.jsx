import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleRegistration(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));

    const registrationResult = await register(formData);
    if (registrationResult.success) {
      const loginResult = await login(formData);
      if (loginResult.success) {
        navigate("/", { replace: true });
      }
    }
  }

  return (
    <>
      <form onSubmit={handleRegistration}>
        <input type="text" name="username" placeholder="username" />
        <input type="text" name="password" placeholder="password" />
        <input type="text" name="first_name" placeholder="first name" />
        <input type="text" name="last_name" placeholder="last name" />
        <input type="text" name="email" placeholder="email" />
        <button type="submit">Register</button>
      </form>
    </>
  );
}



  // async function registerUser(formData) {
  //   try {
  //     const response = await fetch(`${import.meta.env.VITE_API_URL}users/registration/`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Помилка ");
  //     }

  //     const result = await response.json();
  //     console.log(result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
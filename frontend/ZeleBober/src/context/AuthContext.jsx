import { createContext, useState} from "react";
import { fetchToken, fetchRefresh } from "../api/tokens";
import { fetchCreateUser } from "../api/users";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(undefined); 

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [user, setUser] = useState(accessToken ? jwtDecode(accessToken) : null);

  async function login(userData) {
    const response = await fetchToken(userData);
    if (response.ok) {
      const data = await response.json();
      setAccessToken(data.access);
      localStorage.setItem("accessToken", data.access);
      setUser(jwtDecode(data.access));
      return {
        success: true,
      };
    }
  };

  async function register(userData) {
    const response = await fetchCreateUser(userData);
    if (response.ok) {
      // const data = await response.json();
      return {
        success: true,
      };
    }
  };

  async function updateToken() {
    const response = await fetchRefresh();
    if (response.ok) {
      const data = await response.json();
      setAccessToken(data.access);
      localStorage.setItem("accessToken", data.access);
      setUser(jwtDecode(data.access)); 
      return {
        success: true,
      };
    }
  };

  const contextData = {
    accessToken,
    user,
    login,
    register,
    updateToken,
  };

  return (
    <AuthContext.Provider value={contextData}>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

  // async function login({ username, password }) {
  //   try {
  //     const response = await fetch(`${import.meta.env.VITE_API_URL}token/`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         username: username,
  //         password: password,
  //       }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setAccessToken(data.access);
  //       localStorage.setItem("accessToken", data.access);
  //       setUser(jwtDecode(data.access)); 
  //       navigate("/", { replace: true });
  //     }
  //   } catch (error) {
  //     setAccessToken("");
  //     localStorage.setItem("accessToken", "");
  //     console.error(error);
  //   }
  // }

  // async function updateToken() {
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}token/refresh/`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (response.ok) {
  //       const data = await response.json();
  //       setAccessToken(data.access);
  //       localStorage.setItem("accessToken", data.access);
  //       setUser(jwtDecode(data.access));
  //       return data.access;
  //     } else {
  //       console.error("Token refresh failed");
  //       setAccessToken("");
  //       localStorage.setItem("accessToken", "");
  //       setUser(null);
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Error refreshing token:", error);
  //     setAccessToken("");
  //     localStorage.setItem("accessToken", "");
  //     setUser(null);
  //     return null;
  //   }
  // }
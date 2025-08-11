import { createContext, useState} from "react";
import { fetchToken, fetchRefresh, fetchBlacklist } from "../api/tokens";
import { fetchCreateUser } from "../api/users";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(undefined); 

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [user, setUser] = useState(() => {
    if (!accessToken) return null;
    try {
      return jwtDecode(accessToken);
    } catch (err) {
      console.error(err);
      return null;
    }
  });


  async function login(userData) {
    try {
      const response = await fetchToken(userData);
      const data = await response.json();
      setAccessToken(data.access);
      localStorage.setItem("accessToken", data.access);
      setUser(jwtDecode(data.access));
      return response;
    }
    catch (error) {
      await logout();
      throw error;
    }
  };
    

  async function register(userData) {
    // try {
      const response = await fetchCreateUser(userData);
      // const data = await response.json();
      return response;
    // }
    // catch (error) {
      // throw error;
    // }
  };


  async function refreshToken() {
    try {
      const response = await fetchRefresh();
      const data = await response.json();
      setAccessToken(data.access);
      localStorage.setItem("accessToken", data.access);
      setUser(jwtDecode(data.access));
      return response;
    }
    catch (error) {
      console.log(error);
      await logout();
    }
  };


  async function logout() {
    try{
      await fetchBlacklist();
    }
    catch (error) {
      console.log(error);
    }
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    setUser(null);
  }

  
  async function authFetch(fetchFunction) {
    if (user.exp <= Math.floor(Date.now() / 1000)) {
      await refreshToken();
      return null;
    }
  // #############################
    console.log(user.exp);
  // #############################
    return await fetchFunction(accessToken);
  }

  const contextData = {
    accessToken,
    user,
    login,
    register,
    logout,
    refreshToken,
    authFetch,
  };

  return (
    <AuthContext.Provider value={contextData}>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
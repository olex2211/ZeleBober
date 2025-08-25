import { createContext, useState, useEffect } from "react";
import { fetchToken, fetchRefresh, fetchBlacklist } from "../api/tokens";
import { fetchCreateUser, fetchUserById } from "../api/users";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(undefined); 

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [decodedToken, setDecodedToken] = useState(() => {
        if (!accessToken) return null;
        try {
            return jwtDecode(accessToken);
        } catch (err) {
            console.error(err);
            return null;
        }
    });
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            if (decodedToken) {
                const response = await authFetch(fetchUserById, {id: decodedToken.user_id});
                setUser(await response.json());
            } else {
                setUser(null);
            }
        };

        loadUser();
    }, [decodedToken]);


    async function login(userData) {
        try {
            const response = await fetchToken(userData);
            const data = await response.json();
            setAccessToken(data.access);
            localStorage.setItem("accessToken", data.access);
            setDecodedToken(jwtDecode(data.access));
            return response;
        }
        catch (error) {
            await logout();
            throw error;
        }
    };
        

    async function register(userData) {
        try {
            const response = await fetchCreateUser(userData);
            return response;
        } catch (error) {
            await logout();
            throw error;
        }
    };


    async function refreshToken() {
        try {
            const response = await fetchRefresh();
            const data = await response.json();
            setAccessToken(data.access);
            localStorage.setItem("accessToken", data.access);
            setDecodedToken(jwtDecode(data.access));
            return data.access;
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
        catch {
            console.log("");
        }
        setAccessToken(null);
        localStorage.removeItem("accessToken");
        setDecodedToken(null);
    }

    
    async function authFetch(fetchFunction, params = {}) {
        try {
            return await fetchFunction({accessToken, ...params});
        } catch (error) {
            console.log(error);
            if (error.status === 401) {
                const refreshedToken = await refreshToken();
                return await fetchFunction({accessToken: refreshedToken, ...params})
            } else {
                throw error;
            }
        }
    }

    const contextData = {
        accessToken,
        decodedToken,
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
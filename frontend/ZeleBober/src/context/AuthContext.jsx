import { Children, createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(undefined);

export default AuthContext;

// export const useAuth = () => {
//     const authContext = useContext(AuthContext);

//     if(!authContext){
//         throw new Error;
//     }

//     return authContext;
// }


export const AuthProvider = ({children}) =>{
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);


    async function login(e) {
        e.preventDefault();
        try {
            const headers = {
                "Content-Type": "application/json",
            };

            if (accessToken) {
                headers["Authorization"] = `Bearer ${accessToken}`;
            }
            const response = await fetch(`http://localhost:8000/api/token/`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setAccessToken(data.access);
                setUser(jwtDecode(data.access));
            }
        } catch (error) {
            setAccessToken(null);
            console.error(error);
        }
    }

    async function updateToken() {
        try {
            const response = await fetch(`http://localhost:8000/api/token/refresh/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Token refreshed:', data);
                setAccessToken(data.access);
                setUser(jwtDecode(data.access));
                return data.access;
            } else {
                // If refresh fails, clear the token and user
                console.error('Token refresh failed');
                setAccessToken(null);
                setUser(null);
                return null;
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            setAccessToken(null);
            setUser(null);
            return null;
        }
    }
    

    const contextData = {
        user,
        accessToken,
        login,
        updateToken,
    }

    return(
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>

    )
}
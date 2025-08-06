import { useContext } from "react"
import AuthContext from "../context/AuthContext"

export default function LoginPage() {
    let {login} = useContext(AuthContext)
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
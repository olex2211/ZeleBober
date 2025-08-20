import SideBar from "../components/SideBar/SideBar"
import Profile from "../components/Profile/Profile"
import {useEffect, useState } from "react";
import { fetchUserById } from "../api/users";
import useAuth from "../context/useAuth";
import Loading from "../components/Loading/Loading"

export default function ProfilePage() {
    const {authFetch, decodedToken} = useAuth();
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const id = decodedToken.user_id;

    useEffect(() => {
        async function getData() {
            const response = await authFetch(fetchUserById, {id});
            setUserData(await response.json());
            setIsLoading(false);
        }

        getData();
    }, []);

    return (
      <>
        <main className="main-container flex flex-row min-h-full overflow-hidden">
          <SideBar profile/>
          
          <div className="profile-container flex flex-col flex-1 h-full overflow-auto">
            {isLoading ? <div>LOADING</div> : <Profile userData={userData}/>}
          </div>
        </main>
      </>
    );
}
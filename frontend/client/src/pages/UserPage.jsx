import SideBar from "../components/SideBar/SideBar"
import Profile from "../components/Profile/Profile"
import {useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchUserById } from "../api/users";
import useAuth from "../context/useAuth";

export default function UserPage() {
    const { id } = useParams();
    const {authFetch} = useAuth();
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        async function getData() {
            const response = await authFetch(fetchUserById, {id});
            console.log(response);
            setUserData(await response.json());
            setIsLoading(false);
        }

        getData();
    }, [id]);

    return (
      <>
        <main className="main-container flex flex-row min-h-full overflow-hidden">
          <SideBar/>
          <div className="profile-container flex flex-col flex-1 h-full overflow-auto">
            {isLoading ? <div>LOADING</div> : <Profile userData={userData}/>}
          </div>
        </main>
      </>
    );
}
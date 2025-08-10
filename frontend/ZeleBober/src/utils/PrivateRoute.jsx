import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/useAuth";

const PrivateRoute = () => {
  const { accessToken, user, refreshToken} = useAuth();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  } else if (user.exp <= Math.floor(Date.now() / 1000)) {
    console.log("refresh");
    await refreshToken();
  }

  return <Outlet />;
};

export default PrivateRoute;
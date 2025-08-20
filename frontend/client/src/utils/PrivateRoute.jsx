import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/useAuth";
import Loading from "../components/Loading/Loading"


const PrivateRoute = () => {
    const { decodedToken, user } = useAuth();

    if (!decodedToken) {
        return <Navigate to="/login" replace />;
    }

    if (user === null) {
        return <Loading/>;
    }

    return <Outlet />;
};

export default PrivateRoute;
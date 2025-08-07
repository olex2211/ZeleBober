import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext';


const PrivateRoute = () => {
  console.log('lol');
  const { user } = useContext(AuthContext)
  if (!user) {
      return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};


export default PrivateRoute;
import {Route, Navigate, Outlet} from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext';


const PrivateRoute = () => {
    console.log('lol');
    let {user} = useContext(AuthContext)
    console.log(user);
    console.log('sdfgg');
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};


export default PrivateRoute;
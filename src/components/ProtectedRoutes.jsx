import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {

    const tokenExits =()=>{
        const token = localStorage.getItem("token");
        return token !== "";
    }

    if(tokenExits()){
        return <Outlet/>
    } else { 
        return <Navigate to='/login' />
    }                     
};                   

export default ProtectedRoutes;
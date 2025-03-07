import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import NavBar from "../NavBar/NavBar";

export default function AdminRootLayout(){

    const { user } = useAuth();
    return(
        user && user.role === 'admin' 
        ?
        <div>
            <NavBar />
            <Outlet />
        </div>
        :
        <Navigate to="/"/>
    )
}
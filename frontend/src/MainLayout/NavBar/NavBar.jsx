import { Link, useNavigate } from "react-router-dom"
import './NavBar.css'
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteLogout } from "../../services/api";


export default function NavBar(){
    const navigate = useNavigate();
    const deleteSession = useMutation({
        mutationFn: deleteLogout,
        onSuccess: () => {
            sessionStorage.removeItem("isLogged");
            sessionStorage.removeItem("role");
            sessionStorage.removeItem("userName");
            navigate('/login');
        }
    })
    const isLogged = sessionStorage.getItem("isLogged");
    const currentRole = sessionStorage.getItem("role");
    const userName = sessionStorage.getItem("userName");
    return (
        <nav class="navbar navbar-expand-lg sticky-top bg-body-tertiary position-fixed w-100">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        {
                            isLogged == "true" 
                            ?                        
                                <li class="nav-item dropdown">
                                    <a 
                                        class="nav-link dropdown-toggle" 
                                        href="#" 
                                        role="button" 
                                        data-bs-toggle="dropdown" 
                                        aria-expanded="false"
                                    >
                                        {userName}
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item">Change Password</a></li>
                                        <li><a class="dropdown-item">Change email</a></li>
                                        <li><hr class="dropdown-divider"/></li>
                                        <li><button 
                                            class="dropdown-item" 
                                            onClick={() => deleteSession.mutate({})}
                                        >Log Out</button></li>
                                    </ul>
                                </li>
                            :
                                <li class="nav-item">
                                    <li>
                                        <Link to="/login" class="nav-link" aria-current="page">login</Link>
                                    </li>
                                </li>
                        }
                        <li class="nav-item">
                            <Link to="/" class="nav-link" aria-current="page">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="#" class="nav-link">Your Order</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="#" class="nav-link">Your Cart</Link>
                        </li>
                        {
                            currentRole==='Admin' && (
                                <>
                                    <li class="nav-item">
                                        <Link to="/admin/admin-home" class="nav-link">Admin Home</Link>
                                    </li>
                                    <li class="nav-item">
                                    <Link to="/admin/add-product" class="nav-link">Add product</Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
        // <div>
        //     <nav>
        //         <ul>
        //             <li>
        //                 <Link to="/">Home</Link>
        //             </li>
        //             <li>
        //                 <Link to="#">Your Order</Link>
        //             </li>
        //             <li>
        //                 <Link to="#">Your Cart</Link>
        //             </li>
        //             <li>
        //                 <Link to="/admin/admin-home">Admin Home</Link>
        //             </li>
        //             <li>
        //                 <Link to="/admin/add-product">Add product</Link>
        //             </li>
        //         </ul>
        //     </nav>
        // </div>
    )
}
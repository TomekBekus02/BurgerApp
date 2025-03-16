import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query";
import { deleteLogout } from "../../services/api";
import { useAuth } from "../../Contexts/AuthContext";
import navBarStyles from './NavBar.module.css'


export default function NavBar() {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const deleteSession = useMutation({
        mutationFn: deleteLogout,
        onSuccess: () => {
            logout();
            navigate('/login');
        }
    })

    return (
        <nav className={`${navBarStyles.navbar} navbar navbar-expand-lg position-absolute sticky-top bg-body-tertiary w-100`}>
            <div className={`${navBarStyles.containerFluid} container-fluid`}>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-center w-100">
                        {
                            user
                                ?
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="fa-solid fa-user"></i> {user.userName}
                                    </a>
                                    <ul className="dropdown-menu">
                                        {/* <li><a className="dropdown-item">Change Password</a></li>
                                        <li><a className="dropdown-item">Change email</a></li>
                                        <li><hr className="dropdown-divider" /></li> */}
                                        <li>
                                            <button
                                                className="dropdown-item text-success"
                                                onClick={() => deleteSession.mutate({})}
                                            >Log Out
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                                :
                                <li class="nav-item">
                                    <li>
                                        <Link to="/login" className="nav-link" aria-current="page">Login</Link>
                                    </li>
                                </li>
                        }
                        <li className="nav-item">
                            <Link to="/" className="nav-link" aria-current="page">Home</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link to="#" className="nav-link">Your Order</Link>
                        </li> */}
                        {
                            user && user.role === 'admin' && (
                                <>
                                    <li className="nav-item">
                                        <Link to="/admin/admin-home" className="nav-link">Admin Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/add-product" className="nav-link">Add product</Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
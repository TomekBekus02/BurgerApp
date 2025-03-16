import { useMutation } from "@tanstack/react-query";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

import { postLogin } from "../../../services/api";
import { useAuth } from "../../../Contexts/AuthContext";
import { useCart } from "../../../Contexts/UserCartContext";
import LoginStyles from './Login.module.css';

export default function Login() {
    const { login, logout } = useAuth();
    const { updateCart } = useCart();
    const [ifShowPassword, setIfShowPassword] = useState(false);
    const navigate = useNavigate();

    const loginUser = useMutation({
        mutationFn: (newUser) => postLogin(newUser),
        onSuccess: (data) => {
            updateCart(data.cart.items, data.cartQuantity, data.cartTotalPrice);
            login(data.token);
            navigate('/');
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userEmail = formData.get('userEmail');
        const userPassword = formData.get('userPassword');
        loginUser.mutate({ userEmail, userPassword });
    }
    return (
        <div className={`${LoginStyles.mainBackgroundd}`}>
            <div className="container">
                <div className={`${LoginStyles.loginBox}`}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="userEmail" name="userEmail" placeholder="name@example.com" />
                            <label for="userEmail">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type={ifShowPassword ? 'text' : `password`} className="form-control" id="userPassword" name="userPassword" placeholder="password" />
                            <label for="userPassword">Password</label>
                        </div>
                        <div className="mb-3 form-check custom-checkbox">
                            <input type="checkbox" className={`${LoginStyles.showPaswordInput} form-check-input`} id="exampleCheck1" onChange={() => setIfShowPassword(prev => !prev)} />
                            <label className={`${LoginStyles.showPaswordLabel}`} htmlFor="exampleCheck1">Show password</label>
                        </div>
                        <button type="submit" className="btn btn-outline-success end-2">Login</button>
                        <p>Don't have account yet? <span><Link to="/sign-up">signup</Link></span></p>
                    </form>
                    <div className={`${LoginStyles.loginPhotoo}`}></div>
                </div>
            </div>
        </div>
    )
}
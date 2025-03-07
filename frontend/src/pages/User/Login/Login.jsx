import { useMutation } from "@tanstack/react-query";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

import { postLogin } from "../../../services/api";
import { useAuth } from "../../../Contexts/AuthContext";

export default function Login() {
    const { login, logout } = useAuth();
    const [ifShowPassword, setIfShowPassword] = useState(false);
    const navigate = useNavigate();
    
    const loginUser = useMutation({
        mutationFn: (newUser) => postLogin(newUser),
        onSuccess: (token) => {
            login(token);
            navigate('/');
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userEmail = formData.get('userEmail');
        const userPassword = formData.get('userPassword');
        loginUser.mutate({userEmail, userPassword});
    }
    return(
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="userEmail" name="userEmail" placeholder="name@example.com"/>
                    <label for="userEmail">Email address</label>
                    <div class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="form-floating mb-3">
                    <input type={ifShowPassword ? 'text' :`password`} class="form-control" id="userPassword" name="userPassword" placeholder="password"/>
                    <label for="userPassword">Password</label>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={() =>setIfShowPassword(prev=>!prev)}/>
                    <label class="form-check-label" for="exampleCheck1">Show password</label>
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
                <p>Don't have account yet? <span><Link to="/sign-up">signup</Link></span></p>
            </form>

        </div>
    )
}
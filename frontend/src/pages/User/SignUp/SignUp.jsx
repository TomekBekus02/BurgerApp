import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


import { postSignIn } from "../../../services/api";
import LoginStyles from '../Login/Login.module.css';

export default function SignUp() {
    const [ifShowPassword, setIfShowPassword] = useState(false);
    const navigate = useNavigate();

    const signupUser = useMutation({
        mutationFn: (newUser) => postSignIn(newUser),
        onSuccess: () => {
            navigate('/login');
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userName = formData.get('userName');
        const userEmail = formData.get('userEmail');
        const userPassword = formData.get('userPassword');
        const userConfirmPassword = formData.get('userConfirmPassword');
        signupUser.mutate({ userName, userEmail, userPassword, userConfirmPassword });
    }
    return (
        <div className={`${LoginStyles.mainBackgroundd}`}>
            <div className="container">
                <div className={`${LoginStyles.loginBox}`}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="userName" name="userName" placeholder="name@example.com" />
                            <label for="userName">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="userEmail" name="userEmail" placeholder="name@example.com" />
                            <label for="userEmail">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type={ifShowPassword ? 'text' : `password`} className="form-control" id="userPassword" name="userPassword" placeholder="Password" />
                            <label for="userPassword">Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type={ifShowPassword ? 'text' : `password`} className="form-control" id="userConfirmPassword" name="userConfirmPassword" placeholder="Password" />
                            <label for="userConfirmPassword">Confirm  Password</label>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className={`${LoginStyles.showPaswordInput} form-check-input`} onClick={() => setIfShowPassword(prev => !prev)} />
                            <label className={`${LoginStyles.showPaswordLabel}`}>Show password</label>
                        </div>
                        <button type="submit" className="btn btn-outline-success">Sign Up</button>
                    </form>
                    <div className={`${LoginStyles.loginPhotoo}`}></div>
                </div>
            </div>
        </div>
    )
}
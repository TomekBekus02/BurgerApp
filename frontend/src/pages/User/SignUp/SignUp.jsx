import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


import { postSignIn } from "../../../services/api";
import { inputStyleValidation } from '../../../utils/reusableFunc'
import LoginStyles from '../Login/Login.module.css';

export default function SignUp() {
    const [ifShowPassword, setIfShowPassword] = useState(false);
    const [emailMsg, setEmailMsg] = useState('');
    const navigate = useNavigate();

    const signupUser = useMutation({
        mutationFn: (newUser) => postSignIn(newUser),
        onSuccess: () => {
            navigate('/login');
        },
        onError: (errors) => {
            setEmailMsg(errors.userEmail ?? '');
            inputStyleValidation('signUpName', errors.userName);
            inputStyleValidation('signUpEmail', errors.userEmail);
            inputStyleValidation('signUpPassword', errors.userPassword);
            inputStyleValidation('signUpConfirmPassword', errors.userConfirmPassword);
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
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="signUpName"
                                name="userName"
                                placeholder="" />
                            <label for="userName" className="form-label">Username</label>
                            <div className="invalid-feedback">
                                Username must be at least 3 characters long
                            </div>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="signUpEmail"
                                name="userEmail"
                                placeholder=""
                            />
                            <label for="userEmail" className="form-label">Email address</label>
                            <div className="invalid-feedback">
                                {emailMsg}
                            </div>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type={ifShowPassword ? 'text' : `password`}
                                className="form-control"
                                id="signUpPassword"
                                name="userPassword"
                                placeholder=""
                            />
                            <label for="userPassword" className="form-label">Password</label>
                            <div className="invalid-feedback">
                                Password must be at least 6 characters long
                            </div>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type={ifShowPassword ? 'text' : `password`}
                                className="form-control"
                                id="signUpConfirmPassword"
                                name="userConfirmPassword"
                                placeholder=""
                            />
                            <label for="userConfirmPassword" className="form-label">Confirm  Password</label>
                            <div className="invalid-feedback">
                                Passwords have to match!
                            </div>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className={`${LoginStyles.showPaswordInput} form-check-input`}
                                onClick={() => setIfShowPassword(prev => !prev)}
                            />
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
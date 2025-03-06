import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


import { postSignIn } from "../../../services/api";

export default function SignUp(){
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
        signupUser.mutate({userName, userEmail, userPassword, userConfirmPassword});
    }
    return(
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="userName" name="userName" placeholder="name@example.com"/>
                    <label for="userName">User Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="userEmail" name="userEmail" placeholder="name@example.com"/>
                    <label for="userEmail">Email address</label>
                </div>
                <div class="form-floating mb-3">
                    <input type={ifShowPassword ? 'text' :`password`} class="form-control" id="userPassword" name="userPassword" placeholder="Password"/>
                    <label for="userPassword">Password</label>
                </div>
                <div class="form-floating mb-3">
                    <input type={ifShowPassword ? 'text' :`password`} class="form-control" id="userConfirmPassword" name="userConfirmPassword" placeholder="Password"/>
                    <label for="userConfirmPassword">Confirm  Password</label>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" onClick={() =>setIfShowPassword(prev=>!prev)}/>
                    <label class="form-check-label">Show password</label>
                </div>
                <button type="submit" class="btn btn-primary">Sign Up</button>
            </form>


        </div>
    )
}
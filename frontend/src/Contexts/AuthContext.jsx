import { createContext, useContext, useState } from "react";

const AuthContex = createContext();

export const AuthProvider = ({children}) => {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const AdminLogin = () => setIsAdminLoggedIn(true);
    const UserLogin = () => setIsUserLoggedIn(true);
    const Logout = () => {
        setIsAdminLoggedIn(false);
        setIsUserLoggedIn(false);
    }
    return (
        <AuthContex.Provider value={{isAdminLoggedIn, isUserLoggedIn, AdminLogin, UserLogin, Logout}}>
            {children}
        </AuthContex.Provider>
    )
}

export const  useAuth = () => useContext(AuthContex);
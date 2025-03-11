import { createContext, useContext, useState } from "react";

const AuthContex = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = sessionStorage.getItem("token");
        return token ? JSON.parse(atob(token.split(".")[1])) : null;
    })
    const login = (token) => {
        sessionStorage.setItem("token", token);
        setUser(JSON.parse(atob(token.split(".")[1]))); // Dekodowanie tokena
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        setUser(null);
    };
    return (
        <AuthContex.Provider value={{ user, login, logout }}>
            {children}
        </AuthContex.Provider>
    )
}

export const useAuth = () => useContext(AuthContex);
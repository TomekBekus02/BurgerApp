import { Outlet } from "react-router-dom";
import NavBar from '../NavBar/NavBar'


export default function RootLayout() {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    )
}
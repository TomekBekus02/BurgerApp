import { Outlet } from "react-router-dom";
import NavBar from '../NavBar/NavBar'
import './RootLayout.css'

export default function RootLayout(){
    return (
        <div>
            <div className="mainRootLayout">
                <NavBar />
                <Outlet />
            </div>
        </div>
    )
}
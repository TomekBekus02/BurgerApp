import { Outlet } from "react-router-dom";
import MainNavigation from '../components/MainNavigation'
import ClientProfile from '../components/ClientProfile'
import '../../styles/RootLayout.css'

export default function RootLayout(){
    return (
        <div>
            <div className="mainRootLayout">
                <MainNavigation />
                <Outlet />
            </div>
        </div>
    )
}
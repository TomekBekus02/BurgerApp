import NavBar from "../../MainLayout/NavBar/NavBar";
import homeStyles from '../User/Home/Home.module.css'

export default function ErrorPage() {
    return (
        <>
            <NavBar />
            <div className={homeStyles.mainBackground}>
                <div className="container">
                    <div className="text-light d-flex align-items-center flex-column">
                        <img src="/assets/images/sadBurger.png" className="w-50" alt="Sad_Burger" />
                        <h1>This page doesn't exist</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
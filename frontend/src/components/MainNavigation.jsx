import { Link } from "react-router-dom"

export default function MainNavigation(){
    return (
    <header>
        <nav>
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/admin/add-product">Add product</Link>
                </li>
            </ul>
        </nav>
    </header>
    )
}
import { Link } from "react-router-dom"
import './NavBar.css'

export default function NavBar(){
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="#">Your Order</Link>
                    </li>
                    <li>
                        <Link to="#">Your Cart</Link>
                    </li>
                    <li>
                        <Link to="/admin/admin-home">Admin Home</Link>
                    </li>
                    <li>
                        <Link to="/admin/add-product">Add product</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
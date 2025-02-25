import { useNavigate, useParams } from "react-router-dom"
import "../../styles/componentsStyles/dialogTopping.css"
import "../../styles/utilStyles/utilStyles.css"

export default function DialogTopping({ref, toppingId}){
    const navigate = useNavigate();
    const {productId} = useParams();
    return (
        <dialog ref={ref} className="dialog-container">
            <h1>What do you want to do?</h1>
            <button 
                className="btn modify-button"
                onClick={() => {navigate(`/admin/edit-topping/${productId}/${toppingId}`)}}
            >Modify</button>
            <button className="btn delete-button">Delete</button>
            <form method="dialog" className="dialog-button">
                <button>X</button>
            </form>
        </dialog>
    )
}
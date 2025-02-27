import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import "./dialogTopping.css"
import "../../styles/utilStyles.css"

export default function DialogTopping({ref, toppingId}){
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {productId} = useParams();
    const deleteTopping = useMutation({
        mutationFn: () => {
            return axios.delete(`http://localhost:3000/admin/delete-topping/${productId}/${toppingId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["Products"]);
            queryClient.invalidateQueries(["Toppings"]);
            navigate(`/admin/modify-topping/${productId}`)
        }
    })
    return (
        <dialog ref={ref} className="dialog-container">
            <h1>What do you want to do?</h1>
            <button 
                className="btn modify-button"
                onClick={() => {navigate(`/admin/edit-topping/${productId}/${toppingId}`)}}
            >Modify</button>
            <button 
                className="btn delete-button"
                onClick={()=>{deleteTopping.mutate({toppingId})}}
            >Delete</button>
            <form method="dialog" className="dialog-button">
                <button>X</button>
            </form>
        </dialog>
    )
}
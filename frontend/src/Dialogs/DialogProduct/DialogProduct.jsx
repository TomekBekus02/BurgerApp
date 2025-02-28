import { useNavigate, useParams } from "react-router-dom"
import "../DialogTopping/dialogTopping.css"
import "../../styles/utilStyles.css"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import './dialogProduct.css'
import { deleteProduct } from "../../services/api";

export default function DialogProduct({ref, productId}){
    const queryClient = useQueryClient();
    const deleteProd = useMutation({
        mutationFn: () => deleteProduct(productId),
        onSuccess: () => {
            queryClient.invalidateQueries("Products");
        }
    })
    return (
        <dialog ref={ref} className="dialog-container">
            <h1>Are you sure ?</h1>
            <div className="button-container">
                <button 
                    className="btn delete-button"
                    onClick={()=>deleteProd.mutate()}
                >Yes</button>
                <form method="dialog">
                    <button className="btn green-button">No</button>
                </form>
            </div>
        </dialog>
    )
}
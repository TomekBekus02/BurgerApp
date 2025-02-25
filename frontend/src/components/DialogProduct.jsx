import { useNavigate, useParams } from "react-router-dom"
import "../../styles/componentsStyles/dialogTopping.css"
import "../../styles/utilStyles/utilStyles.css"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import '../../styles/componentsStyles/dialogProduct.css'

export default function DialogProduct({ref, productId}){
    const queryClient = useQueryClient();
    const deleteProduct = useMutation({
        mutationFn: async (id) => {
            return await axios.delete(`http://localhost:3000/admin/delete-product/${productId}`)
        },
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
                    onClick={()=>deleteProduct.mutate()}
                >Yes</button>
                <form method="dialog">
                    <button className="btn green-button">No</button>
                </form>
            </div>
        </dialog>
    )
}
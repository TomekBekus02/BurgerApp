import { useNavigate, useParams } from "react-router-dom"
import "../../styles/utilStyles.css"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { deleteProduct } from "../../services/api";
import dialogStyles from '../dialog.module.css'

export default function DialogProduct({ ref, productId }) {
    const queryClient = useQueryClient();
    const deleteProd = useMutation({
        mutationFn: () => deleteProduct(productId),
        onSuccess: () => {
            queryClient.invalidateQueries("Products");
        }
    })
    return (
        <dialog ref={ref}>
            <div className={`${dialogStyles.dialogbackground}`}>
                <div className={`${dialogStyles.dialogContent} border-0 rounded`}>
                    <h1 className="text-light p-3">Are you sure ?</h1>
                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-danger fs-4"
                            onClick={() => deleteProd.mutate()}
                        >Yes</button>
                        <form method="dialog">
                            <button className="btn btn-success fs-4">No</button>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>
    )
}
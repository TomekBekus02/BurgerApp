import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query";

import "../../styles/utilStyles.css"
import { deleteTopping } from "../../services/api";
import dialogStyles from '../dialog.module.css'

export default function DialogTopping({ ref, toppingId }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { productId } = useParams();

    const deleteTopp = useMutation({
        mutationFn: ({ productId, toppingId }) => deleteTopping(productId, toppingId),
        onSuccess: () => {
            queryClient.invalidateQueries(["Products", productId]);
            queryClient.invalidateQueries(["Toppings", toppingId]);
            navigate(`/admin/modify-topping/${productId}`)
        }
    })
    return (
        <dialog ref={ref}>
            <div className={`${dialogStyles.dialogbackground}`}>
                <div className={`${dialogStyles.dialogContent} border-0 rounded position-relative`}>
                    <h1 className="text-light p-3">What do you want to do?</h1>
                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-warning fs-5"
                            onClick={() => navigate(`/admin/edit-topping/${productId}/${toppingId}`)}
                        >Modify</button>
                        <button
                            className="btn btn-danger fs-5"
                            onClick={() => { deleteTopp.mutate({ productId, toppingId }) }}
                        >Delete</button>
                    </div>
                    <form method="dialog" className="position-absolute top-0 end-0 fs-5">
                        <button
                            class="btn-close btn-close-white"
                        ></button>
                    </form>
                </div>
            </div>

        </dialog>
    )
}
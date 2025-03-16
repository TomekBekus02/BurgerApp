import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";

import "../AddProduct/AddProduct.css"
import "../../../styles/utilStyles.css"
import { addTopping } from "../../../services/api";
import LoginStyles from '../../User/Login/Login.module.css';

export default function AddTopping() {
    const { productId } = useParams();
    const navigate = useNavigate();

    const addTopp = useMutation({
        mutationFn: ({ newTopping, productId }) => addTopping(newTopping, productId),
        onSuccess: () => {
            navigate(`/admin/modify-topping/${productId}`);
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const title = formData.get('title');
        const price = formData.get('price');

        addTopp.mutate({ newTopping: { title, price }, productId });
    }
    return (
        <div className={`${LoginStyles.mainBackgroundd}`}>
            <div className="container">
                <div className={`${LoginStyles.loginBox}`}>
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-light text-center p-3">Add topping</h1>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="title" name="title" placeholder="title" required />
                            <label for="title">Title</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type='number' className="form-control" id="price" name="price" placeholder="price" required />
                            <label for="price">Price</label>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-success end-2 w-100 mb-3"
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
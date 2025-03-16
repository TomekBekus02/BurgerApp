import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";

import "../AddProduct/AddProduct.css"
import "../../../styles/utilStyles.css"
import { addTopping } from "../../../services/api";
import LoginStyles from '../../User/Login/Login.module.css';
import { useState } from "react";
import { inputStyleValidation } from "../../../utils/reusableFunc";

export default function AddTopping() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [titleMsg, setTitleMsg] = useState('');
    const [priceMsg, setPriceMsg] = useState('');

    const addTopp = useMutation({
        mutationFn: ({ newTopping, productId }) => addTopping(newTopping, productId),
        onSuccess: () => {
            navigate(`/admin/modify-topping/${productId}`);
        },
        onError: (errors) => {
            console.log(errors);
            setTitleMsg(errors.title ?? '');
            setPriceMsg(errors.price ?? '');
            inputStyleValidation('toppingTitle', errors.title);
            inputStyleValidation('toppingPrice', errors.price);
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const title = formData.get('title');
        const price = formData.get('price').replace(',', '.');

        addTopp.mutate({ newTopping: { title, price }, productId });
    }
    return (
        <div className={`${LoginStyles.mainBackgroundd}`}>
            <div className="container">
                <div className={`${LoginStyles.loginBox}`}>
                    <form onSubmit={handleSubmit} noValidate>
                        <h1 className="text-light text-center p-3">Add topping</h1>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="toppingTitle" name="title" placeholder="" />
                            <label for="title" className="form-label">Title</label>
                            <div className="invalid-feedback">
                                {titleMsg}
                            </div>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="form-floating mb-3">
                            <input type='number' className="form-control" id="toppingPrice" name="price" placeholder="" />
                            <label for="price" className="form-label">Price</label>
                            <div className="invalid-feedback">
                                {priceMsg}
                            </div>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
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
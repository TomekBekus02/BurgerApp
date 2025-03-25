import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { fetchToppingById, updateTopping } from "../../../services/api";
import LoginStyles from '../../User/Login/Login.module.css';
import { inputStyleValidation } from "../../../utils/reusableFunc";
import { useState } from "react";

export default function EditTopping() {
    const { toppingId, productId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [titleMsg, setTitleMsg] = useState('');
    const [priceMsg, setPriceMsg] = useState('');

    const editTopping = useMutation({
        mutationFn: ({ editedTopping, toppingId }) => updateTopping(editedTopping, toppingId),
        onSuccess: () => {
            queryClient.invalidateQueries(["Toppings", toppingId]);
            queryClient.invalidateQueries(["Products", productId]);
            navigate(`/admin/modify-topping/${productId}`);
        },
        onError: (errors) => {
            setTitleMsg(errors.title ?? '');
            setPriceMsg(errors.price ?? '');
            inputStyleValidation('toppingTitle', errors.title);
            inputStyleValidation('toppingPrice', errors.price);
        }
    })

    const { data: topping, isLoading, isFetching, isError } = useQuery({
        queryKey: ["Toppings", toppingId],
        queryFn: ({ queryKey }) => {
            const [, toppingId] = queryKey;
            return fetchToppingById(toppingId);
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const price = formData.get('price').replace(',', '.');
        editTopping.mutate({ editedTopping: { title, price }, toppingId });
    }
    return (
        <div className={`${LoginStyles.mainBackgroundd}`}>
            <div className="container">
                <div className={`${LoginStyles.loginBox}`}>
                    {
                        (isLoading || isFetching)
                            ?
                            <p>Loading...</p>
                            :
                            <form onSubmit={handleSubmit}>
                                <h1 className="text-light text-center p-3">Edit topping</h1>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="toppingTitle" name="title" placeholder="title" defaultValue={topping.title} />
                                    <label for="title">Title</label>
                                    <div className="invalid-feedback">
                                        {titleMsg}
                                    </div>
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type='number' className="form-control" id="toppingPrice" name="price" placeholder="price" defaultValue={topping.price} />
                                    <label for="price">Price</label>
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
                                {/* <label for="title">Title:</label>
                                <input type="text" id="title" name="title" defaultValue={topping.title} required />

                                <label for="price">Price:</label>
                                <input type="number" id="price" name="price" defaultValue={topping.price} required />

                                <button type="submit" className="btn">Edit topping</button> */}
                            </form>
                    }
                </div>
            </div>
        </div>

    )
}
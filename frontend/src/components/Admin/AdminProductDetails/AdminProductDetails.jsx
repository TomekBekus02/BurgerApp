import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";

import AdminTopping from "../AdminTopping/AdminTopping";
import { fetchToppings } from "../../../services/api";

import adminProductDetailsStyles from './AdminProductDetails.module.css'

export default function AdminProductDetails({ id, imgURL, title, price }) {
    const navigate = useNavigate();
    const { productId } = useParams();

    const { data, isLoading, isFetching, isError } = useQuery({
        queryKey: ["Toppings", productId],
        queryFn: () => fetchToppings(productId),
    })
    return (
        <div key={id} className={`${adminProductDetailsStyles.productBox}`}>
            <h1 className="text-center text-light p-3">Modify Topping</h1>
            <div className={`${adminProductDetailsStyles.contentContainer}`}>
                <div className={`${adminProductDetailsStyles.productSide}`}>
                    <img src={`${imgURL}`} alt={`${title}`} />
                    <h2 className="text-light text-center pb-4">{title}, {price}zł</h2>
                </div>
                <div className={`${adminProductDetailsStyles.toppingSide}`}>
                    <h3 className="text-light text-center">Product Toppings</h3>
                    <div className={`${adminProductDetailsStyles.toppingsContainer}`}>
                        <div className={`${adminProductDetailsStyles.toppingContent}`}>
                            {
                                (isLoading || isFetching)
                                    ? <p>Loading...</p>
                                    : data.toppings.items.length > 0
                                        ?
                                        data.toppings.items.map((topping) => {
                                            return (
                                                <AdminTopping
                                                    price={topping.price}
                                                    title={topping.title}
                                                    id={topping.toppingId}
                                                />
                                            )
                                        })
                                        :
                                        <p>No any toppings</p>
                            }
                        </div>
                    </div>
                    <div className={`${adminProductDetailsStyles.buttonContainer}`}>
                        <button
                            className='btn btn-success'
                            onClick={() => navigate(`../add-topping/${id}`)}
                        >Add Topping</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
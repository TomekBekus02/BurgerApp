import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import axios from "axios"

import AdminProductDetails from "../../../components/Admin/AdminProductDetails/AdminProductDetails"
import { fetchProductById } from "../../../services/api"
import LoginStyles from '../../User/Login/Login.module.css';

export default function ModifyProductToppings() {

    const { productId } = useParams();
    const { data: product, isLoading, isFetching, isError } = useQuery({
        queryKey: ["Products", productId],
        queryFn: () => fetchProductById(productId),
    })
    return (
        <div className={`${LoginStyles.mainBackgroundd}`}>
            <div className="container">
                {
                    (isLoading || isFetching)
                        ? <p>Loading...</p>
                        : <AdminProductDetails
                            id={product._id}
                            title={product.title}
                            imgURL={product.imgUrl}
                            price={product.price}
                        />
                }
            </div>
        </div>


    )
}
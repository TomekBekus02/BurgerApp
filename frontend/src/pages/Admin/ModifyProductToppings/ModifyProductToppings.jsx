import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import axios from "axios"

import AdminProductDetails from "../../../components/Admin/AdminProductDetails/AdminProductDetails"

const fetchProduct = async(productId) => {
    const {data} = await axios.get(`http://localhost:3000/admin/find-product/${productId}`)
    return data
}

export default function ModifyProductToppings(){

    const { productId } = useParams();
    const {data: product, isLoading, isFetching, isError} = useQuery({
        queryKey: ["Products"], 
        queryFn: () => fetchProduct(productId),
    })
    return (
        <div>
            <h1>Modify Topping</h1>
            {
                ( isLoading || isFetching )
                    ? <p>Loading...</p> 
                    : <AdminProductDetails
                        id={product._id}
                        title={product.title}
                        imgURL={product.imgUrl}
                        price={product.price}
                    />
            }
        </div>
    )
}
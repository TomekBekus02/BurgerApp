import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import AdminProductDetails from "../components/AdminProductDetails"
import axios from "axios"

const fetchProduct = async(productId) => {
    const {data} = await axios.get(`http://localhost:3000/admin/find-product/${productId}`)
    return data
}

export default function ModifyTopping(){

    const { productId } = useParams();
    const {data: product, isLoading, isFetching, isError} = useQuery({queryKey: ["Product"], queryFn: () => fetchProduct(productId)})
    return (
        <div>
            <h1>Modify Topping</h1>
            {
                isLoading || isFetching
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
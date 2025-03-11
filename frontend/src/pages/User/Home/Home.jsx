import { Query, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import axios from "axios"

import Product from '../../../components/User/Product/Product'
import "../../../styles/Main.css"
import InputFilter from "../../../utils/InputFilter"
import { filteredProd } from "../../../Logic/filterProductsLogic"
import { fetchProducts, fetchUserCart } from "../../../services/api"
import ButtonCart from "../../../components/User/Cart/ButtonCart/ButtonCart"
import OffCanvaCart from "../../../components/User/Cart/offCanvaCart/OffCanvaCart"
import { useAuth } from "../../../Contexts/AuthContext"

export default function Home() {

    const { user } = useAuth();

    const { data: products, isLoading, isFetching, isError } = useQuery({
        queryKey: ["Products"],
        queryFn: fetchProducts
    })

    const { data: userCart, isLoading: userIsLoading, isFetching: userIsFetching, isError: userIsError } = useQuery({
        queryKey: ["User"],
        queryFn: () => fetchUserCart(user.userId)
    })

    const [filterProductInput, setFilterProductInput] = useState("");
    const filteredProducts = products ? filteredProd(products, filterProductInput) : [];

    return (
        <div>
            {
                (userIsLoading || userIsFetching)
                    ?
                    null
                    :
                    <>
                        <ButtonCart />
                        <OffCanvaCart />
                    </>
            }
            <InputFilter setFilterProductInput={setFilterProductInput} />
            <div className="products">
                {
                    (isLoading || isFetching)
                        ? <p>Loading...</p>
                        : (filteredProducts.length > 0)
                            ? filteredProducts.map(product => {
                                return (
                                    <Product
                                        id={product._id}
                                        title={product.title}
                                        imgURL={product.imgUrl}
                                        price={product.price}
                                        description={product.description}
                                        toppings={product.toppings}
                                    />
                                )
                            })
                            : <p>No Products</p>

                }
            </div>
        </div>
    )
}
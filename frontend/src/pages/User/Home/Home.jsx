import { Query, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import axios from "axios"

import Product from '../../../components/User/Product/Product'
import "../../../styles/Main.css"
import InputFilter from "../../../utils/InputFilter"
import { filteredProd } from "../../../Logic/filterProductsLogic"
import { fetchProducts } from "../../../services/api"

export default function Home() {

    const { data: products, isLoading, isFetching, isError } = useQuery({
        queryKey: ["Products"],
        queryFn: fetchProducts
    })

    const [filterProductInput, setFilterProductInput] = useState("");
    const filteredProducts = products ? filteredProd(products, filterProductInput) : [];

    return (
        <div>
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
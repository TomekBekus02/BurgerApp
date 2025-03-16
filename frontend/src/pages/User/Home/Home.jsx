import { Query, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import axios from "axios"

import Product from '../../../components/User/Product/Product'
import InputFilter from "../../../utils/InputFilter"
import { filteredProd } from "../../../Logic/filterProductsLogic"
import { fetchProducts, fetchUserCart } from "../../../services/api"
import ButtonCart from "../../../components/User/Cart/ButtonCart/ButtonCart"
import OffCanvaCart from "../../../components/User/Cart/OffCanvaCart/OffCanvaCart"
import homeStyles from './Home.module.css'

export default function Home() {

    const { data: products, isLoading, isFetching, isError } = useQuery({
        queryKey: ["Products"],
        queryFn: fetchProducts
    })

    const [filterProductInput, setFilterProductInput] = useState("");
    const filteredProducts = products ? filteredProd(products, filterProductInput) : [];

    return (

        <div className={homeStyles.mainBackground}>

            <ButtonCart />
            <OffCanvaCart />

            <InputFilter setFilterProductInput={setFilterProductInput} />
            <div className={homeStyles.products}>
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
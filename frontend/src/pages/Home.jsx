import { Query, useQuery } from "@tanstack/react-query"
import axios from "axios"

import Product from '../components/Product'
import "../../styles/Main.css"
import InputFilter from "../components/InputFilter"
import { useState } from "react"

const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost:3000/products')
    console.log("pobrane dane: " + data)
    return data
}

export default function Home(){

    const { data: products, isLoading,isFetching, isError } = useQuery({
        queryKey: ["Products"], 
        queryFn: fetchProducts
    })

    const [filterProductInput, setFilterProductInput] = useState("");
    const filteredProducts = products?.filter(item => 
        item.title.replace(/\s+/g,'').toLowerCase().includes(filterProductInput.replace(/\s+/g,'').toLowerCase())        
    );
    return (
        <div>
            <InputFilter setFilterProductInput={setFilterProductInput}/>
            <div className="products">
                {
                    (isLoading || isFetching)  
                        ? <p>Loading...</p> 
                        : (filteredProducts.length > 0 || isError)
                            ? filteredProducts.map(product => {
                                return (
                                    <Product 
                                        id={product._id}
                                        title={product.title}
                                        imgURL={product.imgUrl}
                                        price={product.price}
                                    />
                                )
                            })
                            : <p>No Products</p>

                }
            </div>
        </div>
    )
}
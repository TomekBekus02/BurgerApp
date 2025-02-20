import { Query, useQuery } from "@tanstack/react-query"
import axios from "axios"

import Product from '../components/Product'

const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost:3000/products')
    console.log("pobrane dane: " + data)
    return data
}

export default function Home(){

    const { data: products, isLoading, isError } = useQuery({queryKey: ["Products"], queryFn: fetchProducts})
    return (
        <div>
            <h1>Home Page</h1>
            {
                isLoading 
                    ? <p>Loading...</p> 
                    : products.length > 0
                        ?products.map(product => {
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
    )
}
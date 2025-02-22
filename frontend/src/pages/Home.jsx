import { Query, useQuery } from "@tanstack/react-query"
import axios from "axios"

import Product from '../components/Product'
import "../../styles/Main.css"

const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost:3000/products')
    console.log("pobrane dane: " + data)
    return data
}

export default function Home(){

    const { data: products, isLoading, isError } = useQuery({queryKey: ["Products"], queryFn: fetchProducts})
    return (
        <div>
            <input type="text" placeholder="Search" id="filtredProduct" name="filtredProduct" />
            <div className="products">
                {
                    isLoading 
                        ? <p>Loading...</p> 
                        : products.length > 0
                            ? products.map(product => {
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
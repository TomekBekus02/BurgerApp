import { Query, useQuery } from "@tanstack/react-query"
import axios from "axios"
import AdminProduct from '../components/AdminProduct'
import "../../styles/Main.css"
import InputFilter from "../components/InputFilter"
import { useEffect, useState } from "react"

const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost:3000/products')
    return data
}

export default function AdminHome(){
    const {data: products, isLoading, isFetching, isError} = useQuery({
        queryKey: ["Products"], 
        queryFn: fetchProducts
    });

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
                            :(filteredProducts.length > 0)
                            ? filteredProducts.map(product => {
                                return (
                                    <AdminProduct 
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
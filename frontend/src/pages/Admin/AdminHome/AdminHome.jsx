import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import AdminProduct from '../../../components/Admin/AdminProduct/AdminProduct'
import InputFilter from "../../../utils/InputFilter"
import { filteredProd } from "../../../Logic/filterProductsLogic"
import { fetchProducts } from "../../../services/api"
import homeStyles from '../../User/Home/Home.module.css'
import adminHomeStyles from './AdminHome.module.css'
import { Link } from "react-router-dom"


export default function AdminHome() {
    const { data: products, isLoading, isFetching, isError } = useQuery({
        queryKey: ["Products"],
        queryFn: fetchProducts
    });
    const [filterProductInput, setFilterProductInput] = useState("");
    const filteredProducts = products ? filteredProd(products, filterProductInput) : [];

    return (
        <div className={homeStyles.mainBackground}>
            <div className="d-flex">
                <InputFilter setFilterProductInput={setFilterProductInput} />
                <button className={`${adminHomeStyles.buttonStyles} btn btn-success`}><Link to="/admin/add-product" className="nav-link">Add product</Link></button>
            </div>
            <div className={homeStyles.products}>
                {
                    (isLoading || isFetching)
                        ? <p>Loading...</p>
                        : (filteredProducts.length > 0)
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
                            : <h4 className="text-light">No Products</h4>
                }
            </div>
        </div>
    )
}
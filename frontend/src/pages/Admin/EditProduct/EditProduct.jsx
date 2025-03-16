import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"

import { fetchProductById, updateProduct } from "../../../services/api";
import LoginStyles from '../../User/Login/Login.module.css';

export default function EditProduct() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { productId } = useParams();

    const editProduct = useMutation({
        mutationFn: ({ editedProduct, productId }) => updateProduct(editedProduct, productId),
        onSuccess: () => {
            queryClient.invalidateQueries(["Products"]);
            navigate('/admin/admin-home');
        }
    })

    const { data: product, isLoading, isFetching, isError } = useQuery({
        queryKey: ["Products", productId],
        queryFn: () => fetchProductById(productId)
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const editedProduct = {
            title: formData.get('title'),
            price: formData.get('price'),
            description: formData.get('description'),
            imgUrl: formData.get('imgUrl')
        }
        editProduct.mutate({ editedProduct, productId });
    }
    return (
        <div className={`${LoginStyles.mainBackgroundd}`}>
            <div className="container">
                <div className={`${LoginStyles.loginBox}`}>
                    {
                        (isLoading || isFetching)
                            ? <p>Loading...</p>
                            :
                            <form onSubmit={handleSubmit}>
                                <h1 className="text-light text-center p-3">Edit product</h1>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="title" name="title" placeholder="title" defaultValue={product.title} required />
                                    <label for="title">Title</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type='number' className="form-control" id="price" name="price" placeholder="price" defaultValue={product.price} required />
                                    <label for="price">Price</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="imgUrl" name="imgUrl" placeholder="imgUrl" defaultValue={product.imgUrl} required />
                                    <label for="imgUrl">imgUrl</label>
                                </div>
                                <label for="description" className="fs-4 text-light text-center w-100">Description:</label>
                                <textarea className="rounded" name="description" id="description" rows="5" cols="40" defaultValue={product.description} required></textarea>
                                <button
                                    type="submit"
                                    className="btn btn-success end-2 w-100 mb-3"
                                >
                                    Save
                                </button>
                            </form>
                    }
                </div>
            </div>
        </div>
        // <div className="container">
        //     <div className="add-product-container">
        //         <h1>Edit product</h1>
        // {
        //     (isLoading || isFetching) 
        //     ? <p>Loading...</p>
        //     :   <form onSubmit={handleSubmit}>
        //                     <label for="title">Title:</label>
        //                     <input type="text" id="title" name="title" required defaultValue={product.title}/>

        //                     <label for="price">Price:</label>
        //                     <input type="text" id="price" name="price" required defaultValue={product.price}/>

        //                     <label for="imgUrl">img URL:</label>
        //                     <input type="text" id="imgUrl" name="imgUrl" defaultValue={product.imgUrl}/>

        //                     <label for="description">Description:</label>
        //                     <textarea name="description" id="description" rows="5" cols="65" defaultValue={product.description}></textarea>

        //                     <input type="text" id="productId" value="te" hidden/>

        //                     <button type="submit" className="btn">Edit product</button>
        //                 </form>
        //         }
        //     </div>
        // </div>
    )
}
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"

import { fetchProductById, updateProduct } from "../../../services/api";

export default function EditProduct(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { productId } = useParams();

    const editProduct = useMutation({
        mutationFn: ({editedProduct, productId}) => updateProduct(editedProduct, productId),
        onSuccess: () => {
            queryClient.invalidateQueries(["Products"]);
            navigate('/admin/admin-home');
        }
    })

    const {data: product, isLoading, isFetching, isError} = useQuery({
        queryKey: ["Products", productId], 
        queryFn: () => fetchProductById(productId)
    })
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const title = formData.get('title');
        const price = formData.get('price');
        const description = formData.get('description');
        const imgUrl = formData.get('imgUrl');
        editProduct.mutate({editedProduct: {title, price, imgUrl, description}, productId});
    }
    return (
        <div className="container">
            <div className="add-product-container">
                <h1>Edit product</h1>
                {
                    (isLoading || isFetching) 
                    ? <p>Loading...</p>
                    :   <form onSubmit={handleSubmit}>
                            <label for="title">Title:</label>
                            <input type="text" id="title" name="title" required defaultValue={product.title}/>

                            <label for="price">Price:</label>
                            <input type="text" id="price" name="price" required defaultValue={product.price}/>

                            <label for="imgUrl">img URL:</label>
                            <input type="text" id="imgUrl" name="imgUrl" defaultValue={product.imgUrl}/>

                            <label for="description">Description:</label>
                            <textarea name="description" id="description" rows="5" cols="65" defaultValue={product.description}></textarea>

                            <input type="text" id="productId" value="te" hidden/>

                            <button type="submit" className="btn">Edit product</button>
                        </form>
                }
            </div>
        </div>
    )
}
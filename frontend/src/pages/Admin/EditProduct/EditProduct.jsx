import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"

import { fetchProductById, updateProduct } from "../../../services/api";
import LoginStyles from '../../User/Login/Login.module.css';
import { useState } from "react";
import { inputStyleValidation } from "../../../utils/reusableFunc";

export default function EditProduct() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { productId } = useParams();
    const [titleMsg, setTitleMsg] = useState('');
    const [priceMsg, setPriceMsg] = useState('');

    const editProduct = useMutation({
        mutationFn: ({ editedProduct, productId }) => updateProduct(editedProduct, productId),
        onSuccess: () => {
            queryClient.invalidateQueries(["Products"]);
            navigate('/admin/admin-home');
        },
        onError: (errors) => {
            setTitleMsg(errors.title ?? '');
            setPriceMsg(errors.price ?? '');
            inputStyleValidation('productTitle', errors.title);
            inputStyleValidation('productPrice', errors.price);
            inputStyleValidation('productImgUrl', errors.imgUrl);
            inputStyleValidation('productDescription', errors.description);
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
            price: formData.get('price').replace(',', '.'),
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
                            <form onSubmit={handleSubmit} noValidate>
                                <h1 className="text-light text-center p-3">Edit product</h1>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="productTitle" name="title" placeholder="title" defaultValue={product.title} />
                                    <label for="title" className="form-label">Title</label>
                                    <div className="invalid-feedback">
                                        {titleMsg}
                                    </div>
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type='number' className="form-control" id="productPrice" name="price" placeholder="price" defaultValue={product.price} />
                                    <label for="price" className="form-label">Price</label>
                                    <div className="invalid-feedback">
                                        {priceMsg}
                                    </div>
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="productImgUrl" name="imgUrl" placeholder="imgUrl" defaultValue={product.imgUrl} />
                                    <label for="imgUrl" className="form-label">imgUrl</label>
                                    <div className="invalid-feedback">
                                        imgUrl can not be Empty!
                                    </div>
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <label for="description" className="form-label fs-4 text-light text-center w-100">Description:</label>
                                <textarea className="rounded" name="description" id="productDescription" rows="5" cols="40" defaultValue={product.description} ></textarea>
                                <div className="invalid-feedback">
                                    description can not be Empty!
                                </div>
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
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
    )
}
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";

import "../AddProduct/AddProduct.css"
import "../../../styles/utilStyles.css"
import { addTopping } from "../../../services/api";

export default function AddTopping(){
    const { productId } = useParams();
    const navigate = useNavigate();

    const addTopp = useMutation({
        mutationFn: ({ newTopping, productId }) => addTopping(newTopping, productId),
        onSuccess: () => {
            navigate(`/admin/modify-topping/${productId}`);
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const title = formData.get('title');
        const price = formData.get('price');

        addTopp.mutate({newTopping: {title, price}, productId});
    }
    return(
        
        <div className="container">
            <div className="add-product-container">
                <h1>Add topping</h1>
                <form onSubmit={handleSubmit}>
                    <label for="title">Title:</label>
                    <input type="text" id="title" name="title" required/>

                    <label for="price">Price:</label>
                    <input type="number" id="price" name="price" required/>

                    <button type="submit" className="btn">Add topping</button>
                </form>
            </div>
        </div>
    )
}
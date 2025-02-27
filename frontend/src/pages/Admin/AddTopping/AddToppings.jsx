import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";

import "../AddProduct/AddProduct.css"
import "../../../styles/utilStyles.css"

export default function AddTopping(){
    const { productId } = useParams();
    const navigate = useNavigate();

    const addTopping = useMutation({
        mutationFn: (newTopping) => {
            return axios.post(`http://localhost:3000/admin/add-topping/${productId}`, newTopping);
        },
        onSuccess: () => {
            navigate(`/admin/modify-topping/${productId}`);
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const title = formData.get('title');
        const price = formData.get('price');

        addTopping.mutate({title, price});
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
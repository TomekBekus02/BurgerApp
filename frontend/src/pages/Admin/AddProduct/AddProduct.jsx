import { useNavigate } from "react-router-dom"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import "./AddProduct.css"
import "../../../styles/utilStyles.css"
import { addProduct } from "../../../services/api"

export default function AddProduct() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const addProd = useMutation({
        mutationFn: (newOrder) => addProduct(newOrder),
        onSuccess: () => {
            queryClient.invalidateQueries(["Products"])
            navigate("/")
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const title = formData.get('title');
        const price = formData.get('price');
        const description = formData.get('description');
        const imgUrl = formData.get('imgUrl');

        addProd.mutate({ title, price, imgUrl, description })
    }

    return (
        <div className="container">
            <div className="add-product-container">
                <h1>Add product</h1>
                <form onSubmit={handleSubmit}>
                    <label for="title">Title:</label>
                    <input type="text" id="title" name="title" required />

                    <label for="price">Price:</label>
                    <input type="text" id="price" name="price" required />

                    <label for="imgUrl">img URL:</label>
                    <input type="text" id="imgUrl" name="imgUrl" />

                    <label for="description">Description:</label>
                    <textarea name="description" id="description" rows="5" cols="65"></textarea>

                    <button type="submit" className="btn">Add product</button>
                </form>
            </div>
        </div>



    )
}
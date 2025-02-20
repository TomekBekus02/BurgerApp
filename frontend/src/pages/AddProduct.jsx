import { useQueryClient, useMutation } from "@tanstack/react-query"
import axios from "axios"

export default function AddProduct(){
    const queryClient = useQueryClient()
    const addProduct = useMutation({
        mutationFn: (newOrder) => axios.post("http://localhost:3000/admin/add-product", newOrder),
        //onSuccess: () => queryClient.invalidateQueries(["order"])
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const title = formData.get('title');
        const price = formData.get('price');
        const description = formData.get('description');
        const imageURL = formData.get('imageURL');

        addProduct.mutate({title, price, description, imageURL})
    }
    return (
        <>
            <h1>Add product</h1>
            <form onSubmit={handleSubmit}>
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" required/>

                <label for="price">Price:</label>
                <input type="number" id="price" name="price" required/>

                <label for="imgURL">img URL:</label>
                <input type="text" id="imgURL" name="imgURL" />

                <label for="description">Description:</label>
                <textarea name="description" id="description"></textarea>

                <button type="submit">Add product</button>
            </form>
        </>

        
    )
}
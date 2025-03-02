import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { fetchToppingById, updateTopping } from "../../../services/api";

export default function EditTopping(){
    const { toppingId, productId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const editTopping = useMutation({
        mutationFn: ({editedTopping, toppingId}) => updateTopping(editedTopping, toppingId),
        onSuccess: () => {
            queryClient.invalidateQueries(["Toppings", toppingId]);
            queryClient.invalidateQueries(["Products", productId]);
            navigate(`/admin/modify-topping/${productId}`);
        }
    })

    const {data: topping, isLoading, isFetching, isError} = useQuery({
        queryKey: ["Toppings", toppingId], 
        queryFn: ({ queryKey }) => {
            const [, toppingId] = queryKey;
            return fetchToppingById(toppingId);
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const price = formData.get('price');
        editTopping.mutate({editedTopping: {title, price}, toppingId});
    }
    return (
        <div className="container">
            <div className="add-product-container">
                <h1>Edit topping</h1>
                {
                    ( isLoading || isFetching ) 
                    ? 
                        <p>Loading...</p> 
                    :
                        <form onSubmit={handleSubmit}>
                            <label for="title">Title:</label>
                            <input type="text" id="title" name="title" defaultValue={topping.title} required/>

                            <label for="price">Price:</label>
                            <input type="number" id="price" name="price" defaultValue={topping.price} required/>

                            <button type="submit" className="btn">Edit topping</button>
                        </form>
                }
            </div>
        </div>
    )
}
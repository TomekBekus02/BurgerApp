import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

export default function EditTopping(){
    const { toppingId, productId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const editTopping = useMutation({
        mutationFn: async (editedTopping) => {
            return await axios.post(`http://localhost:3000/admin/edit-topping/${toppingId}`, editedTopping)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["Toppings"]);
            queryClient.invalidateQueries(["Products"]);
            navigate(`/admin/modify-topping/${productId}`);
        }
    })
    const FetchData = async (toppingId) => {
        const { data } = await axios.get(`http://localhost:3000/admin/edit-topping/${toppingId}`)
        return data
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const price = formData.get('price');
        editTopping.mutate({title, price});
    }
    const {data: topping, isLoading, isFetching, isError} = useQuery({
        queryKey: ["Toppings"], 
        queryFn: () => FetchData(toppingId)
    })
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
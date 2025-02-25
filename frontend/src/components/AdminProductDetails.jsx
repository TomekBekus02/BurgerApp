import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"
import '../../styles/componentsStyles/AdminProductDetails.css'
import ToppingModify from "./ToppingModify";

export default function AdminProductDetails({id, imgURL, title, price}){
    const navigate = useNavigate();
    const { productId } = useParams();
    const fetchToppings = async (productId) => {
        const { data } = await axios.get(`http://localhost:3000/admin/get-toppings/${productId}`);
        return data;
    }
    const {data, isLoading, isFetching, isError} = useQuery({queryKey: ["Toppings"], queryFn: () => fetchToppings(productId)})
    return (
        <div key={id} className="product-box">
            <div className="admin-product product">
                <div className='imgContainer'>
                    <img src={`${imgURL}`} alt={`${title}`} />
                    <p>{price}zł</p>
                </div>
                <h2>{title}</h2>
                <div className="toppings-box">
                    <h3>Product Toppings</h3>
                    <div className="toppings-container">
                        {
                            (isLoading || isFetching) 
                            ? <p>Loading...</p>
                            : data.toppings.items.length > 0 
                                ? 
                                    data.toppings.items.map((topping) => {
                                        return (
                                            <ToppingModify 
                                                price={topping.toppingId.price} 
                                                title={topping.toppingId.title}
                                                id={topping.toppingId._id}
                                            />
                                        )
                                    })
                                :
                                    <p>No any toppings</p>
                        }
                    </div>
                </div>
                <div className="button-container">
                    <button 
                        className='add-cart-button btn' 
                        onClick={() => navigate(`../add-topping/${id}`)}
                    >Add Topping</button>
                </div>
            </div>
        </div>
    )
}
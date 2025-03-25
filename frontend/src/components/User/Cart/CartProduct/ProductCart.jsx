import { useMutation } from "@tanstack/react-query"
import { useCart } from "../../../../Contexts/UserCartContext";
import { useAuth } from "../../../../Contexts/AuthContext";
import { updatedQuantity } from "../../../../services/api";

import ProductCartStyles from './CartProduct.module.css';

export default function ProductCart({ cartProductId, quantity, itemCartPrice, cartProduct }) {
    const { user } = useAuth();
    const { updateCart } = useCart()
    const ModifyQuantity = useMutation({
        mutationFn: ({ userId, cartProductId, operation }) => {
            return updatedQuantity(userId, cartProductId, operation)
        },
        onSuccess: (data) => {
            updateCart(data.cart, data.cartQuantity, data.cartTotalPrice);
        },
    })
    const HandleModifyQuantity = (operation) => {
        ModifyQuantity.mutate({ userId: user.userId, cartProductId, operation })
    }
    return (
        <div className={`${ProductCartStyles.itemCartContainer}`} >
            <div className={`${ProductCartStyles.itemContainer}`}>
                <img src={`${cartProduct.imgUrl}`} alt={`${cartProduct.title}`} />
                <h2>{cartProduct.title}</h2>
                <h5>{quantity} x {itemCartPrice}zł</h5>
                <div className={`${ProductCartStyles.toppingsContainer}`}>
                    {
                        cartProduct.addedToppings.length > 0 &&
                        <>
                            <h5>Toppings: </h5>
                            {
                                cartProduct.addedToppings.map(topping => {
                                    return (
                                        <div className={`${ProductCartStyles.toppingContainer}`} key={topping.toppingId}>
                                            <p>{topping.title}</p>
                                            <p>+{topping.price}zł</p>
                                        </div>
                                    )
                                })
                            }
                        </>


                    }
                </div>
                <button className={`${ProductCartStyles.buttonEditQuntity} ${ProductCartStyles.buttonPlus}`} onClick={() => HandleModifyQuantity('add')}>+</button>
                <button className="btn btn-success w-50" onClick={() => HandleModifyQuantity('delete')}>Delete</button>
                <button className={`${ProductCartStyles.buttonEditQuntity} ${ProductCartStyles.buttonMinus}`} onClick={() => HandleModifyQuantity('sub')}>-</button>
                <hr />
            </div>
        </div >
    )
}
import { useMutation } from "@tanstack/react-query"
import { useCart } from "../../../../Contexts/UserCartContext";
import { useAuth } from "../../../../Contexts/AuthContext";
import { updatedQuantity } from "../../../../services/api";

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
        <div className="itemCartContainer d-flex align-items-center pb-1">
            <button className="h-50 w-50" onClick={() => HandleModifyQuantity('add')}>+</button>
            <div className="itemContainer">
                <img src={`${cartProduct.imgUrl}`} alt={`${cartProduct.title}`} />
                <p>{cartProduct.title}</p>
                <p>Quantity: {quantity}</p>
                <p>{itemCartPrice}zł</p>
                <div className="toppingsContainer">
                    {
                        cartProduct.addedToppings.map(topping => {
                            return (
                                <div className="toppingContainer d-flex" key={topping.toppingId}>
                                    <p>{topping.title} </p>
                                    <p>. {topping.price}zł</p>
                                </div>
                            )
                        })
                    }
                </div>
                <button onClick={() => HandleModifyQuantity('delete')}>Delete</button>
                <hr />
            </div>
            <button className="h-50 w-50" onClick={() => HandleModifyQuantity('sub')}>-</button>
        </div>
    )
}
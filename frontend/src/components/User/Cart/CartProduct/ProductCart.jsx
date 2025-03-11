import { useCart } from "../../../../Contexts/UserCartContext";

export default function ProductCart({ cartProductId, quantity, itemCartPrice, cartProduct }) {
    return (
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
            <hr />
        </div>
    )
}
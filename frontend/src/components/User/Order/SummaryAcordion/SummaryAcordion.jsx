import { useCart } from "../../../../Contexts/UserCartContext"
import SummaryStyles from './SummaryAcordion.module.css'

export default function SummaryAcordion() {
    const { cart } = useCart()
    return (
        <div className="accordion w-50 p-2" id="accordionCart">
            <h3 className="text-light text-center">Your order</h3>
            {
                cart.map(itemCart => (
                    <div className="accordion-item" key={itemCart.cartProductId}>
                        <h2 className="accordion-header">
                            <button
                                className={`${SummaryStyles.accordionHeader} accordion-button collapsed fs-5`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#${itemCart.cartProductId}`}
                                aria-expanded="false"
                                aria-controls={`${itemCart.cartProductId}`}
                            >
                                {itemCart.cartProduct.title}
                            </button>
                        </h2>
                        <div
                            id={`${itemCart.cartProductId}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionCart"
                        >
                            <div className="accordion-body p-0">
                                <div className={`${SummaryStyles.productContent} d-flex`}>
                                    <img src={`${itemCart.cartProduct.imgUrl}`} alt={`${itemCart.cartProduct.title}`} />
                                    <div className={`${SummaryStyles.toppingContainer}`}>
                                        <h4>Toppings:</h4>
                                        {
                                            itemCart.cartProduct.addedToppings &&
                                                itemCart.cartProduct.addedToppings.length > 0
                                                ?
                                                itemCart.cartProduct.addedToppings.map(topping => (
                                                    <p
                                                        key={topping.toppingId}
                                                        className="p-0 m-1"
                                                    >
                                                        {topping.title} +{topping.price}zł
                                                    </p>
                                                ))
                                                :
                                                <p>no toppings</p>
                                        }
                                        <h6 className="mt-4">Quantity: {itemCart.quantity}</h6>
                                        <h4>Product price: {itemCart.itemCartPrice}zł</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
import { useCart } from "../../../../Contexts/UserCartContext"
import ProductCart from "../CartProduct/ProductCart";
import OffCanvaCartStyles from './OffCanvaCart.module.css'

export default function OffCanvaCart() {
    const { cart, cartTotalPrice } = useCart();
    return (
        <div class={`${OffCanvaCartStyles.offcanvasContainer} offcanvas offcanvas-end`} data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            <div class="offcanvas-header">
                <h5
                    class="offcanvas-title"
                    id="offcanvasWithBothOptionsLabel"
                >
                    <i class="fa-solid fa-cart-shopping fs-4"></i> Your Cart
                </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div class="offcanvas-body">
                {
                    (cart && cart.length > 0)
                        ?
                        <div className={`${OffCanvaCartStyles.productsContainer} w-100 d-flex flex-column`}>
                            {
                                cart.map(item => {
                                    return <ProductCart
                                        key={item.cartProductId}
                                        cartProductId={item.cartProductId}
                                        quantity={item.quantity}
                                        itemCartPrice={item.itemCartPrice}
                                        cartProduct={item.cartProduct}
                                    />
                                })
                            }

                        </div>
                        :
                        <p className="text-light text-center fs-5">Your Cart is Empty</p>
                }
                <h1 className="border-top border-bottom p-3 text-center text-light">Total Price: {cartTotalPrice}zł</h1>
                <button className="w-100 btn btn-success fs-4" disabled>Order</button>

            </div>
        </div>
    )
}
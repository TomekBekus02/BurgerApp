import { useCart } from "../../../../Contexts/UserCartContext"
import ProductCart from "../CartProduct/ProductCart";

export default function OffCanvaCart() {
    const { cart } = useCart();
    return (
        <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
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
                        <div className="cartContainer w-100 d-flex flex-column">
                            {
                                cart.map(item => {
                                    console.log(item);
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
                        <p>Your Cart is Empty</p>
                }

            </div>
        </div>
    )
}
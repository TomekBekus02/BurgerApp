import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { addProductToCart } from "../../../services/api"
import ToppingCheckBox from "../ToppingCheckBox/ToppingCheckBox";
import { useAuth } from "../../../Contexts/AuthContext";
import { useCart } from "../../../Contexts/UserCartContext";

export default function AddProductModal({ productId, imgURL, title, price, description, toppings }) {
  const [currentPrice, setCurrentPrice] = useState(price);
  const [checkedToppings, setCheckedToppings] = useState([]);
  const { user } = useAuth();
  const { updateCart } = useCart();
  const queryClient = useQueryClient();
  const AddToCart = useMutation({
    mutationFn: (addedProduct) => {
      return addProductToCart(addedProduct)
    },
    onSuccess: (data) => {
      updateCart(data.cart, data.cartQuantity, data.cartTotalPrice);
    },
  })

  const handleAddToCart = () => {
    AddToCart.mutate({ productId, title, imgURL, price, checkedToppings, currentPrice, user });
  }
  return (
    // <!-- Modal -->
    <div
      class="modal fade"
      id={`productModal-${productId}`}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby={`productModal-${productId}`}
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 w-100" id={`productModal-${productId}`}>Add your personalized dish</h1>
            {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
          </div>
          {
            <div class="modal-body">
              <img src={`${imgURL}`} alt={`${title}`} />
              <h1>{title}</h1>
              <p>{price}</p>
              <p>{description}</p>

              <form>
                <p>Toppings</p>
                {
                  toppings.items.length > 0
                    ?
                    toppings.items.map(items =>
                      <ToppingCheckBox
                        key={items.toppingId}
                        toppingId={items.toppingId}
                        title={items.title}
                        price={items.price}
                        setCurrentPrice={setCurrentPrice}
                        setCheckedToppings={setCheckedToppings}
                      />
                    )
                    :
                    <p>no toppings</p>
                }
              </form>
            </div>
          }
          <div class="modal-footer">
            <h1>Price: {currentPrice}zł</h1>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button
              type="submit"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={handleAddToCart}
            >
              Add your product
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

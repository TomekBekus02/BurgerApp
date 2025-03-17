import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { addProductToCart } from "../../../services/api"
import ToppingCheckBox from "../ToppingCheckBox/ToppingCheckBox";
import { useAuth } from "../../../Contexts/AuthContext";
import { useCart } from "../../../Contexts/UserCartContext";

import ModalStyles from './AddProductModal.module.css'


export default function AddProductModal({ productId, imgURL, title, price, description, toppings }) {
  useEffect(() => {
    const removeBackdrop = () => {
      if (!document.hidden) {
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) {
          backdrop.remove();
          document.body.classList.remove("modal-open");
        }
      }
    };

    document.addEventListener("visibilitychange", removeBackdrop);

    return () => {
      document.removeEventListener("visibilitychange", removeBackdrop);
    };
  }, []);
  const [currentPrice, setCurrentPrice] = useState(price);
  const [checkedToppings, setCheckedToppings] = useState([]);
  const { user } = useAuth();
  const { updateCart } = useCart();

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
      className="modal fade"
      id={`productModal-${productId}`}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby={`productModal-${productId}`}
      aria-hidden="true"
    >
      <div className={`${ModalStyles.modalDialog} modal-dialog modal-dialog-centered modal-dialog-scrollable`}>
        <div className={`${ModalStyles.modalContent} modal-content`}>
          <div className="modal-header">
            <h1 className="modal-title fs-3 w-100 text-center" id={`productModal-${productId}`}>
              Add your personalized dish
            </h1>
          </div>
          {
            <div className="d-flex">
              <div className={`${ModalStyles.modalBody}`}>
                <img src={`${imgURL}`} alt={`${title}`} />
                <h1>{title}, {price}zł</h1>
                {/* <p>{description}</p> */}
              </div>
              <form>
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
                    <p className="text-center">No toppings</p>
                }
              </form>
            </div>
          }
          <div className={`${ModalStyles.modalFooter} modal-footer`}>
            <h2>Price: {currentPrice}zł</h2>
            <div className={`${ModalStyles.buttonsBox} `}>
              <button
                type="submit"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={handleAddToCart}
              >
                Add your product
              </button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

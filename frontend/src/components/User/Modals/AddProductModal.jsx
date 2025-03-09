import { useQuery } from "@tanstack/react-query"
import { fetchProductById } from "../../../services/api"
import { useState } from "react"
import ToppingCheckBox from "../ToppingCheckBox/ToppingCheckBox";

export default function AddProductModal({ id, imgURL, title, price, description, toppings }) {
  const [currentPrice, setCurrentPrice] = useState(price);
  return (
    // <!-- Modal -->
    <div class="modal fade" id={`productModal-${id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby={`productModal-${id}`} aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 w-100" id={`productModal-${id}`}>Add your personalized dish</h1>
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
                    toppings.items.map(items => {
                      return (
                        <ToppingCheckBox
                          toppingId={items.toppingId}
                          title={items.title}
                          price={items.price}
                          setCurrentPrice={setCurrentPrice}
                        />
                      )

                    })
                    :
                    <p>no toppings</p>
                }
                <input type="number" value={currentPrice} hidden />
                <input type="text" value={id} hidden />
              </form>
            </div>

          }
          <div class="modal-footer">
            <h1>Price: {currentPrice}zł</h1>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Add your product</button>
          </div>
        </div>
      </div>
    </div>
  )
}

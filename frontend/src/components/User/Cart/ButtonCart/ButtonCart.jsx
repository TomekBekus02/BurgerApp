import { useEffect, useState } from "react";

export default function ButtonCart({ userCart }) {

    return (
        <button
            type="button"
            class="btn btn-primary position-fixed end-0 me-3"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions"
            aria-controls="offcanvasWithBothOptions"
        >
            <i class="fa-solid fa-cart-shopping fs-4"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {/* {userCart.items.length} */}0
            </span>
        </button>
    )
}
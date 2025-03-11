import { createContext, useContext, useState } from "react";

const CartContex = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const userCart = sessionStorage.getItem("cart");
        return userCart ? userCart : [];
    });
    const [cartQuantity, setCartQuantity] = useState(() => {
        const userCartQuantity = sessionStorage.getItem("cartQuantity");
        //console.log("pobranie cartAuantity: " + userCartQuantity);
        return userCartQuantity ? Number(userCartQuantity) : 0;
    })
    const updateCart = (userCart, userCartQuantity) => {
        sessionStorage.setItem("cart", JSON.stringify(userCart.items));
        sessionStorage.setItem("cartQuantity", JSON.stringify(userCartQuantity));
        //console.log("Koszyk w useContext po pobraniu z backendu: " + userCart)
        setCart(userCart);
        setCartQuantity(Number(userCartQuantity));
    }
    const LoginSetCart = () => {
        //setCart(userCart);
        setCartQuantity(() => {
            const userCartQuantity = sessionStorage.getItem("cartQuantity");
            //console.log("pobranie cartAuantity: " + userCartQuantity);
            return userCartQuantity ? Number(userCartQuantity) : 0;
        });
    }
    return (
        <CartContex.Provider value={{ cart, cartQuantity, updateCart, LoginSetCart }}>
            {children}
        </CartContex.Provider>
    )
}

export const useCart = () => useContext(CartContex);
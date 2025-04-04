import { createContext, useContext, useState } from "react";

const CartContex = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const userCart = sessionStorage.getItem("cart");
        if (!userCart || userCart === 'undefined' || userCart === '') {
            return [];
        }
        try {
            return JSON.parse(userCart);
        } catch (error) {
            return [];
        }
    });
    const [cartQuantity, setCartQuantity] = useState(() => {
        const userCartQuantity = sessionStorage.getItem("cartQuantity");
        return userCartQuantity ? Number(userCartQuantity) : 0;
    })
    const [cartTotalPrice, setCartTotalPrice] = useState(() => {
        const userCartTotalPrice = sessionStorage.getItem("cartTotalPrice");
        return userCartTotalPrice ? Number(userCartTotalPrice) : 0;
    })
    const updateCart = (userCart, userCartQuantity, cartTotalPrice) => {
        sessionStorage.setItem("cart", JSON.stringify(userCart));
        sessionStorage.setItem("cartQuantity", String(userCartQuantity));
        sessionStorage.setItem("cartTotalPrice", String(cartTotalPrice));
        setCart(userCart);
        setCartQuantity(Number(userCartQuantity));
        setCartTotalPrice(Number(cartTotalPrice));
    }
    const LoginSetCart = () => {
        setCart(() => {
            const userCart = sessionStorage.getItem("cart");
            return userCart ? JSON.parse(userCart) : [];
        });
        setCartQuantity(() => {
            const userCartQuantity = sessionStorage.getItem("cartQuantity");
            return userCartQuantity ? Number(userCartQuantity) : 0;
        });
        setCartTotalPrice(() => {
            const userCartTotalPrice = sessionStorage.getItem("cartTotalPrice");
            return userCartTotalPrice ? Number(userCartTotalPrice) : 0;
        });
    }
    const resetCart = () => {
        sessionStorage.removeItem("cart");
        sessionStorage.removeItem("cartQuantity");
        sessionStorage.removeItem("cartTotalPrice");
        setCart([]);
        setCartQuantity(0);
        setCartTotalPrice(0);
    }
    return (
        <CartContex.Provider value={{ cart, cartQuantity, cartTotalPrice, updateCart, LoginSetCart, resetCart }}>
            {children}
        </CartContex.Provider>
    )
}

export const useCart = () => useContext(CartContex);
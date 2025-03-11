import { createContext, useContext, useState } from "react";

const CartContex = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const userCart = sessionStorage.getItem("cart");
        //console.log(userCart);
        if (!userCart || userCart === 'undefined' || userCart === '') {
            return []; // Zwracamy pustą tablicę, jeśli nie ma poprawnych danych
        }
        try {
            return JSON.parse(userCart); // Parsujemy tylko wtedy, gdy dane są poprawne
        } catch (error) {
            console.error("Błąd parsowania JSON:", error); // Możesz tutaj zapisać logi, jeśli coś pójdzie nie tak
            return []; // Zwracamy pustą tablicę w razie błędu
        }
    });
    const [cartQuantity, setCartQuantity] = useState(() => {
        const userCartQuantity = sessionStorage.getItem("cartQuantity");
        //console.log("pobranie cartAuantity: " + userCartQuantity);
        return userCartQuantity ? Number(userCartQuantity) : 0;
    })
    const updateCart = (userCart, userCartQuantity) => {
        sessionStorage.setItem("cart", JSON.stringify(userCart));
        sessionStorage.setItem("cartQuantity", String(userCartQuantity));
        //console.log("Koszyk w useContext po pobraniu z backendu: " + userCart)
        console.log("Session: " + sessionStorage.getItem("cart"));
        console.log("cart: " + JSON.stringify(cart, null, 2));
        console.log("ja pierdole: " + JSON.stringify(userCart, null, 2));
        setCart(userCart);
        setCartQuantity(Number(userCartQuantity));
    }
    const LoginSetCart = () => {
        setCart(() => {
            const userCart = sessionStorage.getItem("cart");
            //console.log(userCart);
            return userCart ? JSON.parse(userCart) : [];
        });
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
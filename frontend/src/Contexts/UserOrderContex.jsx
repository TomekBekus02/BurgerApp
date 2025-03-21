import { createContext, useContext, useState } from "react"

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [payMethod, setPayMethod] = useState('');
    const selectedMethod = (method) => {
        setPayMethod(method);
    }
    const [deliveryData, setDeliveryData] = useState({
        name: '',
        surname: '',
        phoneNr: '',
        email: '',
        address: '',
        streetNr: '',
        homeNr: ''
    });

    return (
        <OrderContext.Provider value={{ payMethod, deliveryData, selectedMethod, setDeliveryData }}>
            {children}
        </OrderContext.Provider>
    )
}

export const useOrder = () => useContext(OrderContext);
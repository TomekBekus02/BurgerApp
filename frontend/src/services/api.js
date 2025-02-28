import axios from "axios"

//Product
export const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost:3000/products');
    return data;
}

export const fetchProductById = async (productId) => {
    const { data } = await axios.get(`http://localhost:3000/product/${productId}`);
    return data;
}

export const addProduct = async (newOrder) => {
    return await axios.post("http://localhost:3000/admin/product", newOrder);
}

export const updateProduct = async (editedProduct, productId) => {
    return await axios.put(`http://localhost:3000/admin/product/${productId}`, editedProduct);
}

export const deleteProduct = async (productId) => {
    return await axios.delete(`http://localhost:3000/admin/product/${productId}`);
}

//Topping

export const fetchToppings = async (productId) => {
    const { data } = await axios.get(`http://localhost:3000/toppings/${productId}`);
    return data;  
}

export const fetchToppingById = async (toppingId) => {
    const { data } = await axios.get(`http://localhost:3000/topping/${toppingId}`);
    return data
}

export const addTopping = async (newTopping, productId) => {
    return await axios.post(`http://localhost:3000/admin/topping/${productId}`, newTopping);
}

export const updateTopping = async (editedTopping, toppingId) => {
    return await axios.put(`http://localhost:3000/admin/topping/${toppingId}`, editedTopping);
}

export const deleteTopping = async (productId, toppingId) => {
    return await axios.delete(`http://localhost:3000/admin/topping/${productId}/${toppingId}`);
}
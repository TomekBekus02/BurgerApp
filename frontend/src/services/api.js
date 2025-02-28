import axios from "axios"


export const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost:3000/products')
    return data;
}

export const fetchProductById = async (productId) => {
    const { data } = await axios.get(`http://localhost:3000/product/${productId}`)
    return data;
}

export const addProduct = async (newOrder) => {
    return await axios.post("http://localhost:3000/admin/add-product", newOrder)
}

export const updateProduct = async (editedProduct, productId) => {
    return await axios.post(`http://localhost:3000/admin/edit-product/${productId}`, editedProduct)
}

export const deleteProduct = async (productId) => {
    return await axios.delete(`http://localhost:3000/admin/delete-product/${productId}`)
}

export const fetchToppings = async (productId) => {
    const { data } = await axios.get(`http://localhost:3000/admin/get-toppings/${productId}`);
    return data;  
}

export const fetchToppingById = async (toppingId) => {
    const { data } = await axios.get(`http://localhost:3000/admin/edit-topping/${toppingId}`)
    return data
}

export const addTopping = async (newTopping, productId) => {
    return await axios.post(`http://localhost:3000/admin/add-topping/${productId}`, newTopping);
}

export const updateTopping = async (editedTopping, toppingId) => {
    return await axios.post(`http://localhost:3000/admin/edit-topping/${toppingId}`, editedTopping)
}

export const deleteTopping = async (productId, toppingId) => {
    return await axios.delete(`http://localhost:3000/admin/delete-topping/${productId}/${toppingId}`)
}
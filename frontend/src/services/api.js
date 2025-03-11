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
    const token = sessionStorage.getItem("token");
    return await axios.post("http://localhost:3000/admin/product", newOrder, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    });
}

export const updateProduct = async (editedProduct, productId) => {
    const token = sessionStorage.getItem("token");
    return await axios.put(`http://localhost:3000/admin/product/${productId}`, editedProduct, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    });
}

export const deleteProduct = async (productId) => {
    const token = sessionStorage.getItem("token");
    return await axios.delete(`http://localhost:3000/admin/product/${productId}`, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    });
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
    const token = sessionStorage.getItem("token");
    return await axios.post(`http://localhost:3000/admin/topping/${productId}`, newTopping, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    });
}

export const updateTopping = async (editedTopping, toppingId) => {
    const token = sessionStorage.getItem("token");
    return await axios.put(`http://localhost:3000/admin/topping/${toppingId}`, editedTopping, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    });
}

export const deleteTopping = async (productId, toppingId) => {
    const token = sessionStorage.getItem("token");
    return await axios.delete(`http://localhost:3000/admin/topping/${productId}/${toppingId}`, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    });
}

//User

export const postLogin = async (User) => {
    const response = await axios.post('http://localhost:3000/auth/login', User);
    //console.log("In appis: " + JSON.stringify(response.data,null,2));
    return response.data;
}

export const postSignIn = async (newUser) => {
    return await axios.post('http://localhost:3000/auth/signup', newUser);
}

export const deleteLogout = async () => await axios.delete('http://localhost:3000/auth/logout');

export const addProductToCart = async (addedProduct) => {
    const response = await axios.post('http://localhost:3000/addProductToCart', addedProduct);
    return response.data;
}

export const fetchUserCart = async (userId) => {
    const {data} = await axios.get(`http://localhost:3000/userCart/${userId}`);
    //console.log("Nowy koszyk: " + JSON.stringify(data, null, 2));
    return data;
}
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost:3000/products')
    return data;
}

export const fetchProductsById = async (productId) => {
    const { data } = await axios.get(`http://localhost:3000/admin/edit-product/${productId}`)
    return data;
}

export const updateProduct = async (productId, updatedProduct, path) => {

}
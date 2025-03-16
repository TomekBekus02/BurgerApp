import { useNavigate } from "react-router-dom"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import "./AddProduct.css"
import "../../../styles/utilStyles.css"
import { addProduct } from "../../../services/api"
import LoginStyles from '../../User/Login/Login.module.css';

export default function AddProduct() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const addProd = useMutation({
        mutationFn: (newOrder) => addProduct(newOrder),
        onSuccess: () => {
            queryClient.invalidateQueries(["Products"])
            navigate("/")
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const title = formData.get('title');
        const price = formData.get('price');
        const description = formData.get('description');
        const imgUrl = formData.get('imgUrl');
        addProd.mutate({ title, price, imgUrl, description })
    }

    return (
        <div className={`${LoginStyles.mainBackgroundd}`}>
            <div className="container">
                <div className={`${LoginStyles.loginBox}`}>
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-light text-center p-3">Add product</h1>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="title" name="title" placeholder="title" required />
                            <label for="title">Title</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type='number' className="form-control" id="price" name="price" placeholder="price" required />
                            <label for="price">Price</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="imgUrl" name="imgUrl" placeholder="imgUrl" required />
                            <label for="imgUrl">imgUrl</label>
                        </div>
                        <label for="description" className="fs-4 text-light text-center w-100">Description:</label>
                        <textarea className="rounded" name="description" id="description" rows="5" cols="40" required></textarea>
                        <button
                            type="submit"
                            className="btn btn-success end-2 w-100 mb-3"
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>


    )
}
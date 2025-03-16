import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../Contexts/AuthContext"
//import './Product.css'
import '../../../styles/utilStyles.css'
import AddProductModal from '../Modals/AddProductModal'
import productStyles from './Product.module.css'

export default function product({ id, imgURL, title, price, description, toppings }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    return (
        <div key={id} className={productStyles.productBox}>
            <div className={productStyles.product}>
                <div className={productStyles.imgContainer}>
                    <img src={`${imgURL}`} alt={`${title}`} />

                    <h3>{price}zł</h3>
                </div>
                <h2>{title}</h2>
                <div className={productStyles.buttonContainer}>
                    {/* <button className={`${productStyles.detailsButton} btn`}>Details</button> */}
                    {/* <!-- Button trigger modal --> */}
                    {
                        user
                            ?
                            <button
                                type="button"
                                className={`${productStyles.addCartButton} btn`}
                                data-bs-toggle="modal"
                                data-bs-target={`#productModal-${id}`}
                            >
                                Add product
                            </button>
                            :
                            <button
                                type="button"
                                className={`${productStyles.addCartButton} btn`}
                                onClick={() => navigate('/login')}
                            >
                                Add product
                            </button>
                    }

                    <AddProductModal
                        productId={id}
                        imgURL={imgURL}
                        title={title}
                        price={price}
                        description={description}
                        toppings={toppings}
                    />
                </div>
            </div>
        </div>
    )
}
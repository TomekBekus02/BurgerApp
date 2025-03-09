import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../Contexts/AuthContext"
import './Product.css'
import '../../../styles/utilStyles.css'
import AddProductModal from '../Modals/AddProductModal'

export default function product({ id, imgURL, title, price, description, toppings }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    return (
        <div key={id} className="product-box">
            <div className="product">
                <div className='imgContainer'>
                    <img src={`${imgURL}`} alt={`${title}`} />
                    <p>{price}zł</p>
                </div>
                <h2>{title}</h2>
                <div className="button-container">
                    <button className='details-button btn'>Details</button>
                    {/* <!-- Button trigger modal --> */}
                    {
                        user
                            ?
                            <button
                                type="button"
                                class="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target={`#productModal-${id}`}
                            >
                                Add product
                            </button>
                            :
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                            >
                                Add product
                            </button>
                    }

                    <AddProductModal
                        id={id}
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
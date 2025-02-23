import { Link, useNavigate } from 'react-router-dom'
import '../../styles/Product.css'
import '../../styles/utilStyles/utilStyles.css'

export default function AdminProduct({id, imgURL, title, price}){
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
                    <button className='details-button btn' onClick={() => navigate(`../edit-product/${id}`)}>Edit Product</button>
                    <button className='add-cart-button btn' onClick={() => navigate(`../add-topping/${id}`)}>Add Toppings</button>
                </div>
            </div>
        </div>
    )
}
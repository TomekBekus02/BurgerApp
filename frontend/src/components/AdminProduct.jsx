import { Link, useNavigate } from 'react-router-dom'
import '../../styles/Product.css'
import '../../styles/utilStyles/utilStyles.css'
import { useRef } from 'react';
import DialogProduct from './DialogProduct';

export default function AdminProduct({id, imgURL, title, price}){
    const navigate = useNavigate();
    const refDialog = useRef();
    const handleDeleteDialog = () => {
        refDialog.current.showModal();
    }
    return (
        <div key={id} className="product-box">
            <DialogProduct ref={refDialog} productId={id}/>
            <div className="product">
                <div className='imgContainer'>
                    <img src={`${imgURL}`} alt={`${title}`} />
                    <p>{price}zł</p>
                </div>
                <h2>{title}</h2>
                <div className="button-container">
                    <button 
                        className='details-button btn' 
                            onClick={() => navigate(`../edit-product/${id}`)}
                        >Edit Product</button>
                    <button 
                        className='add-cart-button btn' 
                        onClick={() => navigate(`../modify-topping/${id}`)}
                    >Modify Toppings</button>
                    <button
                        className='delete-button btn'
                        onClick={handleDeleteDialog}
                    >Delete Product</button>

                </div>
            </div>
        </div>
    )
}
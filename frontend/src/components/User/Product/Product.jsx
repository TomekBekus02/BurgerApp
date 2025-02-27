import './Product.css'
import '../../../styles/utilStyles.css'

export default function product({id, imgURL, title, price}){
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
                    <button className='add-cart-button btn'>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
import '../../styles/Product.css'

export default function product({id, imgURL, title, price}){
    return (
        <div key={id} className="product">
            <h2>{title}</h2>
            <div className='imgContainer'>
                <img src={`${imgURL}`} alt={`${title}`} />
                <p>{price}</p>
            </div>
            <button>Details</button>
            <button>Add to Cart</button>
        </div>
    )
}
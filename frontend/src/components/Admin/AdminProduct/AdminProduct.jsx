import { useNavigate } from 'react-router-dom'
import { useRef } from 'react';
import DialogProduct from '../../../Dialogs/DialogProduct/DialogProduct';
import '../../../styles/utilStyles.css'
import productStyles from '../../User/Product/Product.module.css'
import AdminProductStyles from './AdminProduct.module.css'

export default function AdminProduct({ id, imgURL, title, price }) {
    const navigate = useNavigate();
    const refDialog = useRef();
    const handleDeleteDialog = () => {
        refDialog.current.showModal();
    }
    return (
        <div key={id} className={productStyles.productBox}>
            <DialogProduct ref={refDialog} productId={id} />
            <div className={productStyles.product}>
                <div className={productStyles.imgContainer}>
                    <img src={`${imgURL}`} alt={`${title}`} />
                    <h3>{price}zł</h3>
                    <div className={`${AdminProductStyles.buttonsModifyBox}`}>
                        <button
                            className="btn btn-outline-danger"
                            onClick={handleDeleteDialog}
                        >
                            Delete</button>
                        <button
                            className="btn btn-outline-warning"
                            onClick={() => navigate(`../edit-product/${id}`)}
                        >
                            Edit
                        </button>
                    </div>
                </div>
                <h2>{title}</h2>
                <div className={productStyles.buttonContainer}>

                    <button
                        className={`${productStyles.addCartButton} btn`}
                        onClick={() => navigate(`../modify-topping/${id}`)}
                    >Modify Toppings</button>


                </div>
            </div>
        </div>
    )
}
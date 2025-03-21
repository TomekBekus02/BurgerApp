import { useNavigate } from 'react-router-dom'
import Orderstyles from '../Order.module.css'
import SummaryStyles from './Summary.module.css'
import { useCart } from '../../../../Contexts/UserCartContext';
import SummaryAcordion from '../../../../components/User/Order/SummaryAcordion/SummaryAcordion';
import SummaryUserData from '../../../../components/User/Order/SummaryUserData/SummaryUserData';

export default function Summary() {
    const navigate = useNavigate();
    const { cart } = useCart();
    return (
        <div className='mainBackground'>
            <div className="container">
                <div className={`${Orderstyles.orderContainer}`}>
                    <div className="progressBarBox mt-3">
                        <div>
                            <div className="w-100 text-center">
                                <div className="ps-3 row">
                                    <div className="col">
                                        <i className="fa-solid fa-house-user fs-3 text-success"></i>
                                    </div>
                                    <div className="col">
                                        <i className="fa-solid fa-money-check-dollar fs-3 text-success"></i>
                                    </div>
                                    <div className="col">
                                        <i className="fa-solid fa-clipboard-list fs-3 text-success"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${Orderstyles.progressBar} progress`} role="progressbar" aria-label="Example with label" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                            <div className={`${Orderstyles.thirdProgressBar} progress-bar`}>Summary your order</div>
                        </div>
                    </div>
                    <div className={`${Orderstyles.contentBox}`}>
                        <div className='d-flex'>
                            <SummaryAcordion />
                            <SummaryUserData />
                        </div>
                        {console.log(JSON.stringify(cart, null, 2))}
                    </div>
                    <div className={`${Orderstyles.buttonBox}`}>
                        <button className={`${Orderstyles.buttonPrev} btn btn-warning`} onClick={() => navigate('/order/payments')}>Previous</button>
                        <button className={`${Orderstyles.buttonNext} btn btn-success`} disabled>Order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
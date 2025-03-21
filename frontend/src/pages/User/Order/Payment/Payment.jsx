import { useNavigate } from 'react-router-dom'
import Orderstyles from '../Order.module.css'
import Paymentstyles from './Payment.module.css'
import { useOrder } from '../../../../Contexts/UserOrderContex';

export default function Payment() {
    const navigate = useNavigate();
    const { selectedMethod, payMethod } = useOrder();
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
                                        <i className="fa-solid fa-clipboard-list fs-3 text-light"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`${Orderstyles.progressBar} progress`}
                            role="progressbar" aria-label="Example with label"
                            aria-valuenow="33"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        >
                            <div className={`${Orderstyles.secondProgressBar} progress-bar`}>Payment method</div>
                        </div>
                    </div>
                    <div className={`${Orderstyles.contentBox}`}>
                        <h3 className='text-center text-light pt-3'>Select a payment Method</h3>
                        <div className={`${Paymentstyles.paymentsContainer}`}>
                            <div className={`${Paymentstyles.paymentBox}`}>
                                <img
                                    src="/assets/images/paymentsLogos/blik.png"
                                    alt="Blik.png"
                                    className={`${payMethod === 'Blik' ? `bg-light` : ''}`}
                                    onClick={() => selectedMethod('Blik')}
                                />
                                <img
                                    src="/assets/images/paymentsLogos/masterCard.png"
                                    alt="masterCard.png"
                                    className={`${payMethod === 'MasterCard' ? `bg-light` : ''}`}
                                    onClick={() => selectedMethod('MasterCard')}
                                />
                            </div>
                            <div className={`${Paymentstyles.paymentBox}`}>
                                <img
                                    src="/assets/images/paymentsLogos/paypal.png"
                                    alt="paypal.png"
                                    className={`${payMethod === 'Paypal' ? `bg-light` : ''}`}
                                    onClick={() => selectedMethod('Paypal')}
                                />
                                <img
                                    src="/assets/images/paymentsLogos/visa.png"
                                    alt="visa.png"
                                    className={`${payMethod === 'Visa' ? `bg-light` : ''}`}
                                    onClick={() => selectedMethod('Visa')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`${Orderstyles.buttonBox}`}>
                        <button
                            className={`${Orderstyles.buttonPrev} btn btn-warning`}
                            onClick={() => navigate('/order/delivery')}
                        >
                            Previous
                        </button>
                        <button
                            className={`${Orderstyles.buttonNext} btn btn-success`}
                            onClick={() => navigate('/order/summary')}
                            disabled={payMethod === ''}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
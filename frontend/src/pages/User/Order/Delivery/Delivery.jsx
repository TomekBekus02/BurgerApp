import { useNavigate } from 'react-router-dom'
import Orderstyles from '../Order.module.css'
import DeliveryStyles from './Delivery.module.css'
import { useOrder } from '../../../../Contexts/UserOrderContex';

export default function Delivery() {
    const navigate = useNavigate();
    const { deliveryData, setDeliveryData } = useOrder();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('nameDelivery');
        const surname = formData.get('surnameDelivery');
        const phoneNr = formData.get('telDelivery');
        const email = formData.get('emailDelivery');
        const address = formData.get('addressDelivery');
        const streetNr = formData.get('streetNrDelivery');
        const homeNr = formData.get('homeNumberDelivery');
        setDeliveryData({ name, surname, phoneNr, email, address, streetNr, homeNr })
        navigate('/order/payments');
    }
    return (
        <div className='mainBackground'>
            <div className="container">
                <form className={`${Orderstyles.orderContainer}`} onSubmit={handleSubmit}>
                    <div className="progressBarBox mt-3">
                        <div>
                            <div className="w-100 text-center">
                                <div className="ps-3 row">
                                    <div className="col">
                                        <i className="fa-solid fa-house-user fs-3 text-success"></i>
                                    </div>
                                    <div className="col">
                                        <i className="fa-solid fa-money-check-dollar fs-3 text-light"></i>
                                    </div>
                                    <div className="col">
                                        <i className="fa-solid fa-clipboard-list fs-3 text-light"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${Orderstyles.progressBar} progress`} role="progressbar" aria-label="Example with label" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100">
                            <div className={`${Orderstyles.firstProgressBar} progress-bar`}>Delivery Details</div>
                        </div>
                    </div>
                    <div className={`${Orderstyles.contentBox}`}>
                        <h3 className='text-center text-light pt-3'>Type your delivery details</h3>
                        <div className={`${DeliveryStyles.formContainer}`}>
                            <div className={`${DeliveryStyles.inputTypeBox}`}>
                                <div className={`${DeliveryStyles.inputBox}`}>
                                    <label htmlFor="nameDelivery" >Name</label>
                                    <input
                                        type="text"
                                        name='nameDelivery'
                                        defaultValue={deliveryData.name}
                                        required
                                    />
                                </div>
                                <div className={`${DeliveryStyles.inputBox}`}>
                                    <label htmlFor="surnameDelivery">Surname</label>
                                    <input
                                        type="text"
                                        name='surnameDelivery'
                                        defaultValue={deliveryData.surname}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={`${DeliveryStyles.inputBox}`}>
                                <label htmlFor="telDelivery">Tel. Nr.</label>
                                <input
                                    type="text"
                                    name='telDelivery'
                                    defaultValue={deliveryData.phoneNr}
                                    minLength="9"
                                    pattern='\d{9}'
                                    title='Number needs to have 9 digits'
                                    maxLength="9"
                                    required
                                />
                            </div >
                            <div className={`${DeliveryStyles.inputBox}`}>
                                <label htmlFor="emailDelivery">E-mail</label>
                                <input
                                    type="email"
                                    name='emailDelivery'
                                    defaultValue={deliveryData.email}
                                    required
                                />
                            </div>
                            <div className={`${DeliveryStyles.inputTypeBox}`}>
                                <div className={`${DeliveryStyles.inputBox}`}>
                                    <label htmlFor="addressDelivery">Res. Address</label>
                                    <input
                                        type="text"
                                        name='addressDelivery'
                                        defaultValue={deliveryData.address}
                                        required
                                    />
                                </div>
                                <div className={`${DeliveryStyles.inputBox}`}>
                                    <label htmlFor="streetNrDelivery">Street Nr</label>
                                    <input
                                        type="number"
                                        name='streetNrDelivery'
                                        className='text-center w-75'
                                        defaultValue={deliveryData.streetNr}
                                        required
                                    />
                                </div>
                                <div className={`${DeliveryStyles.inputBox}`}>
                                    <label htmlFor="homeNumberDelivery">Apartament Nr. (optional)</label>
                                    <input
                                        type="number"
                                        name='homeNumberDelivery'
                                        className='text-center w-75'
                                        defaultValue={deliveryData.homeNr}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${Orderstyles.buttonBox}`}>
                        <button
                            type="button"
                            className={`${Orderstyles.buttonPrev} btn btn-warning`}
                            onClick={() => navigate('/')}
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className={`${Orderstyles.buttonNext} btn btn-success`}
                        >
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
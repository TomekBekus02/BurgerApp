import { useCart } from '../../../../Contexts/UserCartContext'
import { useOrder } from '../../../../Contexts/UserOrderContex';
import SummaryUserDataStyles from './SummaryUserData.module.css'
export default function SummaryUserData() {
    const { cart, cartTotalPrice } = useCart();
    const { payMethod, deliveryData } = useOrder();
    return (
        <div className="w-50 p-2">
            <h3 className="text-center text-light">Your delivery</h3>
            <div className=''>
                <h5><i class="fa-solid fa-user"></i> Name: <span>{deliveryData.name} {deliveryData.surname}</span></h5>
                <h5><i class="fa-solid fa-phone"></i> Tel nr: <span>{deliveryData.phoneNr}</span></h5>
                <h5><i class="fa-solid fa-envelope"></i> Email: <span>{deliveryData.email}</span></h5>
                <h5><i class="fa-solid fa-location-dot"></i> Res. Addr: <span>{deliveryData.address} {deliveryData.streetNr}{deliveryData.homeNr !== '' ? `/${deliveryData.homeNr}` : null}</span></h5>

            </div>
            <h3 className="text-center text-light pt-3">Your payments method</h3>
            <div className=''>
                <h5><i class="fa-solid fa-credit-card"></i> Method: {payMethod}</h5>
                <h5><i class="fa-solid fa-money-bill-1-wave"></i> To pay: {cartTotalPrice} zł</h5>

            </div>
        </div>
    )
}
import { useState } from "react"
import toppingCheckBoxStyles from './toppingCheckBox.module.css'

export default function ToppingCheckBox({ toppingId, title, price, setCurrentPrice, setCheckedToppings }) {
    const [checked, setChecked] = useState(false);

    const handlecheckBoxStatus = (toppingPrice, toppingTitle, toppingId) => {
        const tempChecked = !checked
        setCurrentPrice((prevPrice) =>
            parseFloat(((tempChecked ? prevPrice + +toppingPrice : prevPrice - +toppingPrice).toFixed(2)))
        )
        setCheckedToppings((prevChecked) => {
            const checkedToppings = tempChecked ? [...prevChecked, { toppingId: toppingId, title: toppingTitle, price: toppingPrice }]
                : prevChecked.filter(item => item.toppingId.toString() != toppingId.toString())
            return [...checkedToppings].sort((a, b) =>
                a.toppingId.toString().localeCompare(b.toppingId.toString())
            );
        })
        setChecked(prev => !prev);
    }
    return (
        <div>
            <input
                type="checkbox"
                className={`${toppingCheckBoxStyles.checkBoxInput} form-check-input`}
                name={`${toppingId}`}
                value={toppingId}
                onChange={() => handlecheckBoxStatus(price, title, toppingId)} />
            <label
                className={`${toppingCheckBoxStyles.checkBoxLabel}`}
                htmlFor={`${toppingId}`}
            >
                {title} {price}zł
            </label>
        </div>
    )
}
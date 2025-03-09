import { useState } from "react"

export default function ToppingCheckBox({ toppingId, title, price, setCurrentPrice, setCheckedToppings }) {
    const [checked, setChecked] = useState(false);

    const handlecheckBoxStatus = (toppingPrice, toppingTitle, toppingId) => {
        const tempChecked = !checked
        setCurrentPrice((prevPrice) =>
            tempChecked ? prevPrice + toppingPrice : prevPrice - toppingPrice
        )
        setCheckedToppings((prevChecked) =>
            tempChecked ? [...prevChecked, { toppingId: toppingId, title: toppingTitle, price: toppingPrice }]
                : prevChecked.filter(item => item.toppingId != toppingId)
        )
        setChecked(prev => !prev);
    }
    return (
        <div>
            <label htmlFor={`${toppingId}`}>{title} {price}zł .</label>
            <input
                type="checkbox"
                name={`${toppingId}`}
                value={toppingId}
                onChange={() => handlecheckBoxStatus(price, title, toppingId)} />
            {/* jak nie zadziala to sprobować z e.target */}
        </div>
    )
}
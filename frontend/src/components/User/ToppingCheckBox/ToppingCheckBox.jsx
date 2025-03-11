import { useState } from "react"

export default function ToppingCheckBox({ toppingId, title, price, setCurrentPrice, setCheckedToppings }) {
    const [checked, setChecked] = useState(false);

    const handlecheckBoxStatus = (toppingPrice, toppingTitle, toppingId) => {
        const tempChecked = !checked
        setCurrentPrice((prevPrice) =>
            tempChecked ? prevPrice + toppingPrice : prevPrice - toppingPrice
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
            <label htmlFor={`${toppingId}`}>{title} {price}zł .</label>
            <input
                type="checkbox"
                name={`${toppingId}`}
                value={toppingId}
                onChange={() => handlecheckBoxStatus(price, title, toppingId)} />
        </div>
    )
}
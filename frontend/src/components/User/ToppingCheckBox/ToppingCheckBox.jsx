import { useState } from "react"

export default function ToppingCheckBox({ toppingId, title, price, setCurrentPrice }) {
    const [checked, setChecked] = useState(true);
    const handlecheckBoxStatus = (toppingPrice) => {
        if (checked) {
            setCurrentPrice(prevPrice => prevPrice + toppingPrice);
        } else {
            setCurrentPrice(prevPrice => prevPrice - toppingPrice);
        }
        setChecked(prev => !prev);
    }
    return (
        <div key={toppingId}>
            <label htmlFor={`${toppingId}`}>{title} {price}zł .</label>
            <input
                type="checkbox"
                name={`${toppingId}`}
                value={toppingId}
                onChange={() => handlecheckBoxStatus(price)} />
        </div>
    )
}
import { useRef } from "react"
import DialogTopping from "../../../Dialogs/DialogTopping/DialogTopping"

export default function AdminTopping({title, price, id}){
    const dialog = useRef();
    const handleToppingModify = () => {
        dialog.current.showModal();
    }
    return (
        <div key={id} className="topping-box" onClick={handleToppingModify}>
            <DialogTopping ref={dialog} toppingId={id}/>
            <p>{title}</p>
            <p>{price}zł</p>
        </div>
    )
}
import { useRef } from "react"
import DialogTopping from "../../../Dialogs/DialogTopping/DialogTopping"

import adminToppingStyles from './AdminTopping.module.css'

export default function AdminTopping({ title, price, id }) {
    const dialog = useRef();
    const handleToppingModify = () => {
        dialog.current.showModal();
    }
    return (
        <div key={id} className={`${adminToppingStyles.toppingBox}`} onClick={handleToppingModify}>
            <DialogTopping ref={dialog} toppingId={id} />
            <p className="">{title} +{price}zł</p>
        </div>
    )
}
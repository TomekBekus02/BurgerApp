import "../../styles/componentsStyles/dialogTopping.css"
import "../../styles/utilStyles/utilStyles.css"

export default function DialogTopping({ref}){
    return (
        <dialog ref={ref} className="dialog-container">
            <h1>What do you want to do?</h1>
            <button className="btn modify-button">Modify</button>
            <button className="btn delete-button">Delete</button>
            <form method="dialog" className="dialog-button">
                <button>X</button>
            </form>
        </dialog>
    )
}
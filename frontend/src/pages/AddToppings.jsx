import "../../styles/AddProduct.css"
import "../../styles/utilStyles/utilStyles.css"
export default function AddToppings(){
    return(
        <div className="container">
            <div className="add-product-container">
                <h1>Add topping</h1>
                <form>
                    <label for="title">Title:</label>
                    <input type="text" id="title" name="title" required/>

                    <label for="price">Price:</label>
                    <input type="text" id="price" name="price" required/>

                    <button type="submit" className="btn">Add product</button>
                </form>
            </div>
        </div>
    )
}
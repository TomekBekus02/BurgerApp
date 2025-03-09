const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role :{
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                cartProduct: {
                    productId: {
                        type: mongoose.Types.ObjectId,
                        ref: 'Product',
                        required: true 
                    },
                    title: {
                        type: String,
                        required: true
                    },
                    imgUrl: {
                        type: String,
                        required: true
                    },
                    price: {
                        type: Number,
                        required: true
                    },
                    addedToppings: [
                        {
                            toppingId: {
                                type: mongoose.Types.ObjectId,
                                ref: 'Topping',
                                required: true
                            },
                            title: {
                                type: String,
                                required: true
                            },
                            price: {
                                type: Number,
                                required: true
                            }
                        }
                    ]
                },
                quantity: {
                    type: Number, 
                    required: true
                },
                itemCartPrice: {
                    type: Number,
                    require: true
                }
            }
        ]
    }
})

userSchema.methods.addProductToCart = function(product){
    const { productId, title, imgURL, price, checkedToppings, currentPrice } = product;
    console.log(checkedToppings);
    const cartProductIndex = this.cart.items.findIndex(cp => 
        cp.cartProduct.productId.toString() === productId.toString()
    );
    const newQuantity = 1;
    const updatedItemsInCart = [...this.cart.items];
    if(cartProductIndex >= 0){
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedItemsInCart[cartProductIndex].quantity = newQuantity;
    }else{
        updatedItemsInCart.push({
            cartProduct: {
                productId,
                title,
                imgUrl: imgURL,
                price,
                addedToppings: checkedToppings.map(topping => ({
                    toppingId: topping.toppingId,
                    title: topping.title,
                    price: topping.price
                }))
            },
            quantity: newQuantity,
            itemCartPrice: currentPrice
        })
    }
    const updatedCart = {
        items: updatedItemsInCart
    }
    this.cart = updatedCart;
    return this.save();
}

module.exports = mongoose.model('User', userSchema);
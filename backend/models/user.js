const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');


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
                cartProductId: {
                    type: String,
                    required: true
                },
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

userSchema.methods.addProductToCart = async function(product){
    const { productId, title, imgURL, price, checkedToppings, currentPrice } = product;
    const cartProductIndex = this.cart.items.findIndex(cp => {
        if(cp.cartProduct.productId.toString() !== productId.toString()){
            return false;
        }
        if(cp.cartProduct.addedToppings.length !== checkedToppings.length){
            return false;
        }
        const sortedCartProducts = cp.cartProduct.addedToppings.sort((a,b) => a.toppingId - b.toppingId);
        const areToppingsEqual = sortedCartProducts.every((addedTopping, index) => {
                const checkedTopping = checkedToppings[index];
                return addedTopping.toppingId.toString() === checkedTopping.toppingId.toString();
            });
        return areToppingsEqual;
    });
    let newQuantity = 1;
    const updatedItemsInCart = [...this.cart.items];
    if(cartProductIndex >= 0){
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedItemsInCart[cartProductIndex].quantity = newQuantity;
    }else{
        updatedItemsInCart.push({
            cartProductId: uuidv4(),
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
    return await this.save();
}

userSchema.methods.updatedCart = async function(operation, cartProductId) {
    const updatedItemsInCart = [...this.cart.items];

    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.cartProductId.toString() === cartProductId.toString();
    })
    if(operation == 'add'){
        const newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedItemsInCart[cartProductIndex].quantity = newQuantity;
    }else if(operation == 'sub'){
        const newQuantity = this.cart.items[cartProductIndex].quantity - 1;
        if(newQuantity <= 0){
            const updatedProduct = updatedItemsInCart.filter(cp => {
                return cp.cartProductId.toString() !== cartProductId.toString();
            })
            const updatedCart = {
                items: updatedProduct
            }
            this.cart = updatedCart;
            return await this.save();

        }else{
            updatedItemsInCart[cartProductIndex].quantity = newQuantity;
        }
    }else if(operation == 'delete'){
        const updatedProduct = updatedItemsInCart.filter(cp => {
            return cp.cartProductId.toString() !== cartProductId.toString();
        })
        const updatedCart = {
            items: updatedProduct
        }
        this.cart = updatedCart;
        return await this.save();
    }
    const updatedCart = {
        items: updatedItemsInCart
    }
    this.cart = updatedCart;
    return await this.save();
}

module.exports = mongoose.model('User', userSchema);
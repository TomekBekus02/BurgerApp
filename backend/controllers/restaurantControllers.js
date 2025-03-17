const Product = require('../models/product');
const User = require('../models/user');

exports.addToCart = async (req, res) => {
    const productId = req.body.productId;
    const title = req.body.title;
    const imgURL = req.body.imgURL;
    const price = req.body.price;
    const currentPrice = req.body.currentPrice;
    const userToken = req.body.user;
    const checkedToppings = req.body.checkedToppings ?? [];

    const user = await User.findById(userToken.userId);
    const product = {productId, title, imgURL, price, checkedToppings, currentPrice}
    await user.addProductToCart(product);

    const updatedUser = await User.findById(userToken.userId);
    let cartQuantity = 0;
    let cartTotalPrice = 0;
    for (item of updatedUser.cart.items){
        cartQuantity += item.quantity
        cartTotalPrice += +item.itemCartPrice * item.quantity
    }
    res.status(200).json({messege: "succes add to cart", cart: updatedUser.cart.items, cartQuantity, cartTotalPrice: cartTotalPrice.toFixed(2)});
}

exports.getUserCart = async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    res.status(200).json(user.cart);
}

exports.updateCartQuantity = async (req, res) => {
    const userId = req.params.userId;
    const cartProductId = req.params.cartProductId;
    const operation = req.query.operation;
    const user = await User.findById(userId);

    await user.updatedCart(operation, cartProductId);
    const updatedUser = await User.findById(userId);

    let cartQuantity = 0;
    let cartTotalPrice = 0;
    for (item of updatedUser.cart.items){
        cartQuantity += item.quantity
        cartTotalPrice += +item.itemCartPrice * item.quantity
    }
    //console.log(cartTotalPrice);
    res.status(200).json({messege: "succes updated cart", cart: updatedUser.cart.items, cartQuantity, cartTotalPrice: cartTotalPrice.toFixed(2)});
}


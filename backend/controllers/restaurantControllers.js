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
    for (item of updatedUser.cart.items){
        cartQuantity += item.quantity
    }
    console.log("Uuid check: " + JSON.stringify(updatedUser.cart.items, null, 2));
    res.status(200).json({messege: "succes add to cart", cart: updatedUser.cart.items, cartQuantity});
}

exports.getUserCart = async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    res.status(200).json(user.cart);
}


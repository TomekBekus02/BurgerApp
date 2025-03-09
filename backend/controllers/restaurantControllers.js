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
    console.log(userToken);
    const user = await User.findById(userToken.userId);
    const product = {productId, title, imgURL, price, checkedToppings, currentPrice}
    user.addProductToCart(product);
    res.status(200).json({messege: "succes add to cart"});
}


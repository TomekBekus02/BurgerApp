const Topping = require('../models/topping');
const Product = require('../models/product');

exports.getProductToppings = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const productToppings = await Product.findById(productId);
        res.status(200).json(productToppings);
    } catch (error) {
        console.log(error);
    }   
}

exports.getToppingById = async (req, res, next) => {
    try {
        const toppingId = req.params.toppingId;
        const topping = await Topping.findById(toppingId);
        res.status(200).json(topping);
    } catch (error) {
        console.log(error);
    }
}
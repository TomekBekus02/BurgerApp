const Product = require("../models/product")

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        console.log(products);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
    }
}
exports.getProductById = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        console.log(product);
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
    }
}
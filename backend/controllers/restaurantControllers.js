const Product = require('../models/product')
exports.getProduct = async (req,res,next) => {
    const orders = await Product.find();
    res.status(200).json(orders);
}


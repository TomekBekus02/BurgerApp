const Product = require('../models/product')
exports.getProduct = async (req,res,next) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);  
    } catch (err) {
        console.log("blad wczytania " + err)
    }
}


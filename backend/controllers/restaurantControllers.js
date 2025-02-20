const Product = require('../models/product')
exports.getProduct = async (req,res,next) => {
    try {
        const products = await Product.find();
        console.log(products);
        res.status(200).json(products);  
    } catch (err) {
        console.log("blad wczytania " + err)
    }
}


const Product = require('../models/product')

exports.postAddProduct = (req,res,next) => {
    const title = req.body.title;
    const price = req.body.price;
    const imgURl = req.body.imgUrl;
    const description = req.body.description;

    const product = new Product({
        title: title,
        price: price,
        imgUrl: imgURl,
        description: description
    });
    product
        .save()
        .then(result => {
            console.log('Created product: ');
            console.log(result);
        })
        .catch(err => {
            console.log(err)
        })
    res.status(201).json(product);
}

exports.editProduct = async (req, res, next) => {
    try {
        const id = req.params.productId;
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message: "Product not found!"});
        }
        res.status(200).json(product);
    } catch (err) {
        console.log(err);
    }
}

exports.postEditProduct = async (req, res, next) => {
    try {
        const updatedTitle = req.body.title;
        const updatedPrice = req.body.price;
        const updatedImgUrl = req.body.imgUrl;
        const updatedDescription = req.body.description;
        const id = req.params.productId;
        Product.findById(id)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.imgUrl = updatedImgUrl;
            product.description = updatedDescription;
            return product.save();
        }).then(product => {
            res.status(200).json(product);
        })
        .catch(err => console.log(err));

    } catch (err) {
        err => console.log(err)
    }
}
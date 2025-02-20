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
    //res.status(201).json(product);
}

exports.getProduct = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);  
    } catch (err) {
        console.log("blad wczytania " + err)
    }
}
const Product = require('../models/product')

exports.postAddProduct = (req,res,next) => {
    const title = req.body.title;
    const price = req.body.price;
    const imgURl = req.body.imgUrl;
    const description = req.body.description;

    const product = new Product({
        title:title,
        price:price,
        imgUrl:imgURl,
        description:description
    });
    product
        .save()
        .then(result => {
            console.log('Created product')
        })
        .catch(err => {
            console.log(err)
        })
}
const Product = require('../models/product')
const Topping = require('../models/product-topping')
const mongoose = require('mongoose');

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
        })
        .catch(err => {
            console.log(err)
        })
    res.status(201).json(product);
}

exports.getEditProduct = async (req, res, next) => {
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

exports.getFindProduct = async (req, res, next) => {
    try {
        const id = req.params.productId;
        Product.findById(id)
        .then(product => {
            
            res.status(200).json(product);
        })
        .catch(err => console.log(err));
    } catch (error) {
        
    }
}

exports.postAddTopping = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const title = req.body.title;
        const price = req.body.price;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            console.log("bledny type " + productId);
            return res.status(400).json({ error: 'Nieprawidłowy productId' });
        }
        const topping = new Topping({
            title:title,
            price:price,
            productId:productId
        })
        const AddedTopping = await topping.save()
        console.log("topping added");
        const product = await Product.findById(productId);
        await product.addToppingToProduct(AddedTopping);
        res.status(200).json(AddedTopping);
    } catch (err) {
        console.log(err);
    }
}

exports.getToppings = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId).populate({
            path: 'toppings.items.toppingId',
            select: 'title price'
        });
        console.log("wypisz ");
        console.log(JSON.stringify(product, null, 2));
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
    }
}

exports.getEditTopping = async (req, res, next) => {
    try {
        const toppingId = req.params.toppingId;
        const topping = await Topping.findById(toppingId);
        res.status(200).json(topping);
    } catch (error) {
        console.log(error);
    }
}

exports.postEditTopping = (req, res, next) => {
    try {
        const toppingId = req.params.toppingId
        const title = req.body.title;
        const price = req.body.price;

        Topping.findById(toppingId)
            .then(topping => {
                topping.title = title;
                topping.price = price;
                return topping.save()
            })
            .then(topping => {
                console.log(topping);
                res.status(200).json(topping);
            })
            .catch(error => {
                console.log(error);
            });
    } catch (error) {
        console.log(error);
    }
}
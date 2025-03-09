const Product = require('../models/product')
const Topping = require('../models/topping')
const mongoose = require('mongoose');

//Product 
exports.AddProduct = (req,res,next) => {
    const title = req.body.title;
    const price = req.body.price;
    const imgURl = req.body.imgUrl;
    const description = req.body.description;

    const product = new Product({
        title: title,
        price: price,
        imgUrl: imgURl,
        description: description,
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

exports.UpdateProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const updatedData = req.body;
        Product.findByIdAndUpdate(productId, updatedData, {new: true})
        .then(updatedProduct => {
            if(!updatedProduct){
                return res.status(404).json({message: "Product not found"});
            }
            return res.status(200).json(updatedProduct);
        })
        .catch(err => console.log(err));

    } catch (err) {
        err => console.log(err)
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId
        const product = await Product.findByIdAndDelete(productId)
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
    }
}
//Topping

exports.AddTopping = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const title = req.body.title;
        const price = req.body.price;
        const topping = new Topping({
            title:title,
            price:price,
            productId:productId,
        })
        const AddedTopping = await topping.save()

        const product = await Product.findById(productId);
        await product.addToppingToProduct(AddedTopping);
        res.status(200).json(AddedTopping);
    } catch (err) {
        console.log(err);
    }
}

exports.UpdateTopping = async (req, res, next) => {

    const session = await mongoose.startSession();
    session.startTransaction();  

    try {
        const toppingId = req.params.toppingId;
        const { title, price } = req.body;

        const topping = await Topping.findById(toppingId);
        if (!topping) {
            return res.status(404).json({ message: 'Topping not found' });
        }

        topping.title = title;
        topping.price = price;
        await topping.save();

        const products = await Product.find({ "toppings.items.toppingId": toppingId });

        await Promise.all(
            products.map(async (product) => {
                const updatedToppings = product.toppings.items.map((topping) => {
                    if (topping.toppingId.toString() === toppingId) {
                        return {
                            ...topping,
                            title: topping.title === title ? topping.title : title,
                            price: topping.price === price ? topping.price : price
                        };
                    }
                    return topping;
                });

                product.toppings.items = updatedToppings;
                await product.save();
            })
        );

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: 'Topping updated successfully' });
    } catch (error) {
        await session.abortTransaction(); 
        session.endSession();
        console.error(error);
        res.status(500).json({ message: 'Error updating topping' });
    }
}

exports.deleteTopping = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const toppingId = req.params.toppingId;

        const product = await Product.findById(productId);
        await product.deleteToppingFromProduct(toppingId);

        const topping = await Topping.findByIdAndDelete(toppingId);
        res.status(200).json(topping);

    } catch (error) {
        console.log(error => console.log(error))
    }
}

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const Product = require('../models/product')

const adminControllers = require('../controllers/adminControllers')

//Admin Product
router.post('/product',
    body('title')
        .notEmpty()
        .withMessage('Please provide valid title')
        .custom(async (value) => {
            const productDoc = await Product.findOne({title: value})
            if(productDoc){
                throw new Error("Product with this title already exist")
            }
        }),
    body('price')
        .notEmpty()
        .withMessage('Please provide valid price')
        .isNumeric() 
        .withMessage('Price must be a valid number')
        .custom((value) => {
            if (parseFloat(value) <= 0) {
                throw new Error("Product price can't be less or equal 0");
            }
            if (value === 'e') {
                throw new Error("Product price can't be 'e'");
            }
            return true;
        }),
    body('imgUrl')
        .notEmpty(),
    body('description')
        .notEmpty(),
    adminControllers.AddProduct);
router.put('/product/:productId',
    body('title')
    .notEmpty()
    .withMessage('Please provide valid title')
    .custom(async (value, {req}) => {
        const productId = req.params.productId;
        const updatedProduct = await Product.findById(productId)
        const productDoc = await Product.findOne({title: value})
        if(productDoc && value != updatedProduct.title){
            throw new Error("Product with this title already exist")
        }
    }),
    body('price')
        .notEmpty()
        .withMessage('Please provide valid price')
        .isNumeric() 
        .withMessage('Price must be a valid number')
        .custom((value) => {
            if (parseFloat(value) <= 0) {
                throw new Error("Product price can't be less or equal 0");
            }
            if (value === 'e') {
                throw new Error("Product price can't be 'e'");
            }
            return true;
        }),
    body('imgUrl')
        .notEmpty(),
    body('description')
        .notEmpty(), adminControllers.UpdateProduct);
router.delete('/product/:productId', adminControllers.deleteProduct);

//Admin Topping
router.post('/topping/:productId',
    body('title')
        .notEmpty()
        .withMessage('Please provide valid title'),
    body('price')
        .notEmpty()
        .withMessage('Please provide valid price')
        .isNumeric() 
        .withMessage('Price must be a valid number')
        .custom((value) => {
            if (parseFloat(value) <= 0) {
                throw new Error("Product price can't be less or equal 0");
            }
            if (value === 'e') {
                throw new Error("Product price can't be 'e'");
            }
            return true;
        }),
    adminControllers.AddTopping);
router.put('/topping/:toppingId',
    body('title')
        .notEmpty()
        .withMessage('Please provide valid title'),
    body('price')
        .notEmpty()
        .withMessage('Please provide valid price')
        .isNumeric() 
        .withMessage('Price must be a valid number')
        .custom((value) => {
            if (parseFloat(value) <= 0) {
                throw new Error("Product price can't be less or equal 0");
            }
            if (value === 'e') {
                throw new Error("Product price can't be 'e'");
            }
            return true;
        }),
    adminControllers.UpdateTopping);
router.delete('/topping/:productId/:toppingId', adminControllers.deleteTopping);

module.exports = router;
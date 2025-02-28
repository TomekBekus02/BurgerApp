const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');

router.get('/products', productController.getProducts);
router.get('/product/:productId', productController.getProductById);

module.exports = router;
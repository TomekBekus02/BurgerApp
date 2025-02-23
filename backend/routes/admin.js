const express = require('express');
const router = express.Router();

const adminControllers = require('../controllers/adminControllers')

router.post('/add-product', adminControllers.postAddProduct);
router.get('/edit-product/:productId', adminControllers.editProduct);
router.post('/edit-product/:productId', adminControllers.postEditProduct);
router.get('/find-product/:productId', adminControllers.getFindProduct);
router.post('/add-topping/:productId', adminControllers.postAddTopping);
router.get('/get-toppings/:productId', adminControllers.getToppings);

module.exports = router;
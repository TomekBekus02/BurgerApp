const express = require('express');
const router = express.Router();

const adminControllers = require('../controllers/adminControllers')

//Admin Product
router.post('/product', adminControllers.AddProduct);
router.put('/product/:productId', adminControllers.UpdateProduct);
router.delete('/product/:productId', adminControllers.deleteProduct);

//Admin Topping
router.post('/topping/:productId', adminControllers.AddTopping);
router.put('/topping/:toppingId', adminControllers.UpdateTopping);
router.delete('/topping/:productId/:toppingId', adminControllers.deleteTopping);

module.exports = router;
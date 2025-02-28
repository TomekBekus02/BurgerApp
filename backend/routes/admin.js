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
//router.get('/edit-product/:productId', adminControllers.getEditProduct);
//router.get('/find-product/:productId', adminControllers.getFindProduct);
//router.get('/toppings/:productId', adminControllers.getToppings);
//router.get('/edit-topping/:toppingId', adminControllers.getEditTopping);

module.exports = router;
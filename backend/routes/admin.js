const express = require('express');
const router = express.Router();

const adminControllers = require('../controllers/adminControllers')

router.post('/add-product', adminControllers.postAddProduct);
router.get('/edit-product/:productId', adminControllers.getEditProduct);
router.post('/edit-product/:productId', adminControllers.postEditProduct);
router.get('/find-product/:productId', adminControllers.getFindProduct);
router.post('/add-topping/:productId', adminControllers.postAddTopping);
router.get('/get-toppings/:productId', adminControllers.getToppings);
router.get('/edit-topping/:toppingId', adminControllers.getEditTopping);
router.post('/edit-topping/:toppingId', adminControllers.postEditTopping);
router.delete('/delete-topping/:productId/:toppingId', adminControllers.deleteTopping)

module.exports = router;
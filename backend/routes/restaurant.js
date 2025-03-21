const express = require('express')
const router = express.Router();

const restaurantController = require('../controllers/restaurantControllers');

router.post('/addProductToCart', restaurantController.addToCart);
router.get('/userCart/:userId', restaurantController.getUserCart);
router.patch('/userCart/:userId/:cartProductId', restaurantController.updateCartQuantity);
router.post('/order', restaurantController.setOrder);

module.exports = router;